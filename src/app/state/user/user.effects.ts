import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as userApiActions from './user.api.actions';
import * as userActions from './user.actions';
import { UserService } from 'src/app/services/user.service';

@Injectable({
  providedIn: 'root',
})
export class UserEffects {
  constructor(private actions$: Actions, private userService: UserService) {}

  getPaginatedUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(userApiActions.getUsersPaginated),
      mergeMap((action) => {
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
              return userActions.setPaginatedUsers({
                paginatedUsers: res,
              });
            }),
            catchError((error: any) => {
              throw error;
            })
          );
      })
    );
  });

  getUserById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(userApiActions.getUserById),
      mergeMap((action) => {
        return this.userService.getUserById(action.id).pipe(
          map((res: any) => {
            return userActions.setUser({
              user: res,
            });
          }),
          catchError((error: any) => {
            throw error;
          })
        );
      })
    );
  });
}
