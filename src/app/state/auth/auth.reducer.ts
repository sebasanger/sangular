import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { User } from '../../models/user.model';

export const authFeatureKey = 'auth';
export interface State {
  isAuthenticated: boolean;
  user: User;
}

const initState: State = {
  isAuthenticated: false,
  user: null,
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
  on(AuthActions.userAuthLogout, (state) => ({
    ...state,
    user: null,
    isAuthenticated: false,
  }))
);
