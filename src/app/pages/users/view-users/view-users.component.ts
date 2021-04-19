import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { merge, Observable, Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
import * as userActions from 'src/app/state/user/user.actions';
import * as userApiActions from 'src/app/state/user/user.api.actions';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.scss'],
})
export class ViewUsersComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild('input') input: ElementRef;

  constructor(
    private userStore: Store<{ user: any }>,
    private router: Router
  ) {}
  public filterSubject = new Subject<string>();
  public loading: boolean;
  public error$: Observable<boolean>;
  public defaultSort: Sort = { active: 'id', direction: 'asc' };
  public dataSource: MatTableDataSource<User>;
  public noData: User[] = [<User>{}];
  private subscription: Subscription = new Subscription();
  public displayedColumns = [
    'id',
    'fullName',
    'roles',
    'email',
    'edit',
    'delete',
  ];
  public totalElements: number = 0;
  private filter: string = '';

  ngOnInit() {
    this.userStore.select('user').subscribe((res) => {
      this.initializeData(res);
    });
  }

  private initializeData(data: any): void {
    if (data.paginatedUsers != null && data.paginatedUsers.content.length > 0) {
      this.dataSource = new MatTableDataSource(data.paginatedUsers.content);
      this.totalElements = data.paginatedUsers.totalElements;
    } else {
      this.dataSource = new MatTableDataSource(this.noData);
    }
  }

  ngAfterViewInit() {
    this.loadUserPage();

    let filter$ = this.filterSubject.pipe(
      debounceTime(150),
      distinctUntilChanged(),
      tap((value: string) => {
        this.paginator.pageIndex = 0;
        this.filter = value;
      })
    );

    let sort$ = this.sort.sortChange.pipe(
      tap(() => (this.paginator.pageIndex = 0))
    );

    this.subscription.add(
      merge(filter$, sort$, this.paginator.page)
        .pipe(tap(() => this.loadUserPage()))
        .subscribe()
    );
  }

  loadUserPage() {
    this.userStore.dispatch(
      userApiActions.getUsersPaginated({
        filter: this.filter.toLocaleLowerCase(),
        pageIndex: this.paginator.pageIndex,
        pageSize: this.paginator.pageSize,
        sortDirection: this.sort.direction,
        sort: this.sort.active,
      })
    );
  }

  public retry(): void {
    this.loadUserPage();
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  addNewUser() {
    this.userStore.dispatch(userActions.clearUsers());
    this.router.navigateByUrl('pages/users/create');
  }

  editUser(userid: number) {
    this.router.navigateByUrl('pages/users/update/' + userid);
  }

  deleteUser(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.userStore.dispatch(userApiActions.deletUser({ id }));
        setTimeout(() => {
          this.loadUserPage();
        }, 500);
      } else {
        Swal.fire('Cancelled', 'the user is safe', 'error');
      }
    });
  }

  onRowClicked(row: any) {
    this.router.navigateByUrl('pages/users/details/' + row.id);
  }
}
