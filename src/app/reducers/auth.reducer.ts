import { Action, createReducer, on } from '@ngrx/store';
import { getUserAuth } from '../actions/auth.actions';
import { User } from '../models/user.model';

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
  on(getUserAuth, (state, { user }) => ({
    user: user,
    isAuthenticated: true,
  }))
);
