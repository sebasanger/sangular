import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import {
  apiGetUserAuth,
  apiGetUserAuthError,
  getUserAuth,
  apiUserAuthLogout,
  userAuthLogout,
} from './auth.actions';
import { AuthService } from '../../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

  getUserAuth$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(apiGetUserAuth),
      tap(() => {
        console.log('Obteniendo ifo del usuuario');
      }),
      mergeMap((action) => {
        console.log('Ejecutando la peticion del usuario authenticado');
        return this.authService.getAuthenticatedUser().pipe(
          map((res: any) => {
            return getUserAuth({ user: res });
          }),
          catchError((error: any) => {
            of(apiGetUserAuthError({ error }));
            throw error;
          }),
          tap(() => console.log('Usuario obtenido'))
        );
      })
    );
  });

  logoutUserAuth$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(apiUserAuthLogout),
      mergeMap((action) => {
        return this.authService
          .logout()
          .pipe(map((res: any) => userAuthLogout()));
      })
    );
  });

  /*MODO CORTO SIN USAR LOG Y RETORNO RAPIDO EN LAS FAT ARROWS
  gettUserAuth$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(apiGetUserAuth),
      mergeMap((action) => {
        return this.authService.getAuthenticatedUser().pipe(
          map((res: any) => getUserAuth({ user: res.user })),
          catchError((error: any) => of(apiGetUserAuthError({ error })))
        );
      })
    );
  });
 */
}
