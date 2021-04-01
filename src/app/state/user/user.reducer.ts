import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './user.actions';
import { User } from '../../models/user.model';
import { GetPaginatedUsers } from 'src/app/interfaces/user/get-paginated-users';

export const userFeatureKey = 'user';
export interface State {
  paginatedUsers: GetPaginatedUsers;
  loading: boolean;
  error: boolean;
  userSelected: User;
}

const initState: State = {
  paginatedUsers: null,
  userSelected: null,
  loading: false,
  error: false,
};

export const userReducer = createReducer(
  initState,
  on(AuthActions.loading, (state) => ({
    ...state,
    loading: true,
  })),
  on(AuthActions.getUsersPaginatedSuccess, (state, { paginatedUsers }) => ({
    ...state,
    paginatedUsers,
    error: null,
    loading: false,
  })),
  on(AuthActions.apiGetUserPaginatedError, (state, { error }) => ({
    ...state,
    error,
  })),
  on(AuthActions.setUserSelected, (state, { user }) => ({
    ...state,
    userSelected: user,
  })),
  on(AuthActions.getUserByIdError, (state, { error }) => ({
    ...state,
    userSelected: error,
  }))
);
