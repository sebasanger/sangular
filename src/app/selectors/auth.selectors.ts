import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as authReducer from '../reducers/auth.reducer';

export const UserState = createFeatureSelector<authReducer.State>('auth');

export const getUserState = createSelector(
  UserState,
  (state: authReducer.State) => state.user
);

export const getIsUserAuthenticated = createSelector(
  UserState,
  (state: authReducer.State) => state.isAuthenticated
);

export const getUserRoles = createSelector(
  UserState,
  (state: authReducer.State) => state.user.roles
);
