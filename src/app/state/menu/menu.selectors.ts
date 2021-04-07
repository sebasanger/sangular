import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromMenu from './menu.reducer';

export const UserStateSelector = createFeatureSelector<fromMenu.State>(
  fromMenu.authFeatureKey
);

export const getMenuItems = createSelector(
  UserStateSelector,
  (state: fromMenu.State) => state.menu
);
