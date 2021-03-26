import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import * as authActions from './auth.actions';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  getUserAuth$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(authActions.apiGetUserAuth),
      mergeMap((action) => {
        return this.authService.getAuthenticatedUser().pipe(
          map((res: any) => {
            return authActions.getUserAuthSuccess({ user: res });
          }),
          catchError((error: any) => {
            of(authActions.apiGetUserAuthError({ error }));
            throw error;
          })
        );
      })
    );
  });

  loginUserAuth$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(authActions.login),
      mergeMap((action) => {
        return this.authService.login(action.payload).pipe(
          map((res: any) => {
            this.router.navigateByUrl('pages/dashboard');
            Swal.fire('Welcome', 'Hello', 'success');
            return authActions.loginSuccess({ user: res.user });
          }),
          catchError((error: any) => of(authActions.loginError({ error })))
        );
      })
    );
  });

  logoutUserAuth$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(authActions.apiUserAuthLogout),
      mergeMap((action) => {
        return this.authService
          .logout()
          .pipe(map((res: any) => authActions.userAuthLogout()));
      })
    );
  });
}
