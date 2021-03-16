import { Action, createReducer, on } from '@ngrx/store';
import { SET_USER } from '../actions/auth.actions';
import { User } from '../models/user.model';

export interface State {
  isAuthenticated: boolean;
  user: User;
}

const initState: State = {
  isAuthenticated: false,
  user: null,
};

const _authReducer = createReducer(
  initState,
  on(SET_USER, (state) => ({ user: { ...state.user }, isAuthenticated: true }))
);

export function authReducer(state: State, action: Action) {
  return _authReducer(state, action);
}
