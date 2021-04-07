import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import * as menuActions from './menu.actions';
import * as authActions from '../auth/auth.actions';
import { SidebarService } from 'src/app/services/sidebar.service';

@Injectable({
  providedIn: 'root',
})
export class MenuEfects {
  constructor(
    private actions$: Actions,
    private sidebarService: SidebarService
  ) {}

  getMenuItems$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(menuActions.loadMenu, authActions.getUserAuthSuccess),
      mergeMap((action) => {
        return this.sidebarService.loadMenu().pipe(
          map((res: any) => {
            return menuActions.setMenuItems({ menuItems: res });
          }),
          catchError((error: any) => {
            throw error;
          })
        );
      })
    );
  });
}
