import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './user.actions';
import { User } from '../../models/user.model';
import { GetPaginatedUsers } from 'src/app/interfaces/get-paginated-users';

export const userFeatureKey = 'user';
export interface State {
  paginatedUsers: GetPaginatedUsers;
  userSelected: User;
}

const initState: State = {
  paginatedUsers: null,
  userSelected: null,
};

export const userReducer = createReducer(
  initState,
  on(AuthActions.getUsersPaginatedSuccess, (state, { paginatedUsers }) => ({
    ...state,
    paginatedUsers,
  }))
);
