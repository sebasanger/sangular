import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { fromEvent, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';

import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { ViewUsersDataSource } from './view-users-datasource';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.scss'],
})
export class ViewUsersComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;

  constructor(private userService: UserService, private router: Router) {}

  dataSource: ViewUsersDataSource;
  displayedColumns = ['id', 'fullName', 'roles', 'email', 'edit', 'delete'];
  totalElements: number = 0;

  ngOnInit() {
    this.dataSource = new ViewUsersDataSource(this.userService);
    this.dataSource.totalElements$.subscribe((res) => {
      this.totalElements = res;
    });
    this.dataSource.loadUsers();
  }

  onRowClicked(row: any) {
    Swal.fire('User', row.fullName, 'info');
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadUserPage();
        })
      )
      .subscribe();

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(tap(() => this.loadUserPage()))
      .subscribe();
  }

  loadUserPage() {
    this.dataSource.loadUsers(
      this.paginator.pageIndex,
      this.paginator.pageSize,
      this.input.nativeElement.value,
      this.sort.direction,
      this.sort.active
    );
  }

  addNewUser() {
    this.router.navigateByUrl('pages/users/create');
  }

  editUser(userid: number) {
    this.router.navigateByUrl('pages/users/update/' + userid);
  }
}
