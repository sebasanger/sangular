import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map, mergeMap, tap } from 'rxjs/operators';
import * as authActions from './auth.actions';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    public translate: TranslateService
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
          map((res) => {
            this.router.navigateByUrl('pages/dashboard');
            Swal.fire(
              this.translate.instant('SUCCESS'),
              this.translate.instant('LOGIN.SUCCESS'),
              'success'
            );
            return authActions.loginSuccess({ user: res.user });
          }),
          catchError((error: HttpErrorResponse) => {
            of(authActions.loginError({ error: error.error }));
            throw error;
          })
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

  updateAcount$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(authActions.updateAcount),

      concatMap((action) => {
        return this.authService.updateAcount(action.updateAcountPayload).pipe(
          map((res: any) => {
            Swal.fire('Acount updated', 'Your data is updated', 'success');
            //this.router.navigateByUrl('/pages/users');
            return authActions.apiGetUserAuth();
          }),
          catchError((error: any) => {
            of(authActions.loginError({ error: error }));
            throw error;
          })
        );
      })
    );
  });
}
