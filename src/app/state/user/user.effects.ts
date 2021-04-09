import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  concatMap,
  map,
  mergeMap,
  switchMap,
  tap,
} from 'rxjs/operators';
import * as userApiActions from './user.api.actions';
import * as userActions from './user.actions';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private router: Router
  ) {}

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
            return userActions.selectUser({
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

  createUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(userApiActions.createUser),
      mergeMap((action) => {
        tap(() => {
          console.log('aca bro');
        });
        return this.userService
          .createNewUser(action.userCreateUpdatePayload)
          .pipe(
            map((res: any) => {
              Swal.fire(
                'User created',
                'Activate user acount with the email ' + res.email,
                'success'
              );
              this.router.navigateByUrl('/pages/users');
              return userActions.addUser({
                user: res,
              });
            }),
            catchError((error: any) => {
              of(userActions.setErrors({ error: error }));
              throw error;
            })
          );
      })
    );
  });

  updateUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(userApiActions.modifyUser),

      concatMap((action) => {
        return this.userService.updateUser(action.userCreateUpdatePayload).pipe(
          map((res: any) => {
            Swal.fire('User updated', 'the user data is updated', 'success');
            this.router.navigateByUrl('/pages/users');
            return userActions.addUser({
              user: res,
            });
          }),
          catchError((error: any) => {
            of(userActions.setErrors({ error: error }));
            throw error;
          })
        );
      })
    );
  });

  deleteUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(userApiActions.deletUser),
      switchMap((action) => {
        const userId = action.id;
        return this.userService.deleteUser(userId).pipe(
          map((res: any) => {
            Swal.fire('Deleted!', 'The user has been deleted.', 'success');
            return userActions.deleteUser({ id: userId });
          }),
          catchError((error: any) => {
            Swal.fire('Error!', 'Error on delete!.', 'error');
            userActions.setErrors(error);
            throw error();
          })
        );
      })
    );
  });
}
