import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuth from '../reducers/auth.reducer';

export const UserStateSelector = createFeatureSelector<fromAuth.State>(
  fromAuth.authFeatureKey
);

export const getUserState = createSelector(
  UserStateSelector,
  (state: fromAuth.State) => state.user
);

export const getIsUserAuthenticated = createSelector(
  UserStateSelector,
  (state: fromAuth.State) => state.isAuthenticated
);

export const getUserRoles = createSelector(
  UserStateSelector,
  (state: fromAuth.State) => state.user.roles
);
