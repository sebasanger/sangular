import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { User } from '../../models/user.model';

export const authFeatureKey = 'auth';
export interface State {
  isAuthenticated: boolean;
  user: User;
  errorMessage: String;
}

const initState: State = {
  isAuthenticated: false,
  user: null,
  errorMessage: null,
};

export const authReducer = createReducer(
  initState,
  on(AuthActions.getUserAuthSuccess, (state, { user }) => ({
    ...state,
    user: user,
    isAuthenticated: true,
  })),
  on(AuthActions.loginSuccess, (state, { user }) => ({
    ...state,
    user: user,
    isAuthenticated: true,
  })),
  on(AuthActions.loginError, (state, { error }) => ({
    ...state,
    errorMessage: error.message,
    isAuthenticated: false,
  })),
  on(AuthActions.userAuthLogout, (state) => ({
    ...state,
    user: null,
    isAuthenticated: false,
  }))
);
