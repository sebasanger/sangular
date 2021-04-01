import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as userActions from './user.actions';
import { UserService } from 'src/app/services/user.service';

@Injectable({
  providedIn: 'root',
})
export class UserEffects {
  constructor(private actions$: Actions, private userService: UserService) {}

  getPaginatedUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(userActions.apiGetUsersPaginated),
      mergeMap((action) => {
        of(userActions.loading());
        return this.userService
          .getAllUsers(
            action.filter,
            action.sortDirection,
            action.sort,
            action.pageIndex,
            action.pageSize
          )
          .pipe(
            map((res: any) => {
              return userActions.getUsersPaginatedSuccess({
                paginatedUsers: res,
              });
            }),
            catchError((error: any) => {
              of(userActions.apiGetUserPaginatedError({ error }));
              throw error;
            })
          );
      })
    );
  });
}
