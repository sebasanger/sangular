import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './user.actions';
import { User } from '../../models/user.model';
import { GetPaginatedUsers } from 'src/app/interfaces/user/get-paginated-users';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export const userFeatureKey = 'user';

export function selectUserId(a: User): number {
  return a.id;
}

export function sortByName(a: User, b: User): number {
  return a.fullName.localeCompare(b.fullName);
}

export const userAdapter: EntityAdapter<User> = createEntityAdapter<User>({
  selectId: selectUserId,
  sortComparer: sortByName,
});
export interface State extends EntityState<User> {
  paginatedUsers: GetPaginatedUsers;
  loading: boolean;
  error: boolean;
  userSelected: User;
  total: number;
}
export const initialState: State = userAdapter.getInitialState({
  paginatedUsers: null,
  userSelected: null,
  loading: false,
  error: false,
  total: 0,
});

export const userReducer = createReducer(
  initialState,
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
