import { DataSource, CollectionViewer } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { catchError, finalize, map } from 'rxjs/operators';
import {
  Observable,
  of as observableOf,
  merge,
  BehaviorSubject,
  of,
} from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { GetPaginatedUsers } from 'src/app/interfaces/get-paginated-users';

export interface Users {
  id: number;
  fullName: string;
  email: string;
  roles: string[];
}
export interface PaginateInfo {
  pageable: {
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    sort: { sorted: boolean; empty: boolean };
  };
  size: number;
  totalElements: number;
  totalPages: number;
}

export class ViewUsersDataSource implements DataSource<Users> {
  private usersSubject = new BehaviorSubject<Users[]>([]);

  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  private totalElementsSubject = new BehaviorSubject<number>(0);

  public totalElements$ = this.totalElementsSubject.asObservable();

  constructor(private userService: UserService) {}

  connect(collectionViewer: CollectionViewer): Observable<Users[]> {
    return this.usersSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.usersSubject.complete();
    this.totalElementsSubject.complete();
    this.loadingSubject.complete();
  }

  loadUsers(
    pageIndex = 0,
    pageSize = 5,
    filter = '',
    sortDirection = 'asc',
    sort: string = 'id'
  ) {
    this.loadingSubject.next(true);

    return this.userService
      .getAllUsers(filter, sortDirection, sort, pageIndex, pageSize)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((res: any) => {
        this.usersSubject.next(res.content);
        this.totalElementsSubject.next(res.totalElements);
      });
  }
}
