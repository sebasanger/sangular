import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as authReducer from '../reducers/auth.reducer';

export const getUserStatus = createFeatureSelector<authReducer.State>('auth');

export const getUser = createSelector(
  getUserStatus,
  (state: authReducer.State) => state.user
);

export const getIsUserAuthenticated = createSelector(
  getUserStatus,
  (state: authReducer.State) => state.isAuthenticated
);

export const getUserRoles = createSelector(
  getUserStatus,
  (state: authReducer.State) => state.user.roles
);
