import { createAction, props } from '@ngrx/store';
import { GetPaginatedUsers } from 'src/app/interfaces/user/get-paginated-users';
import { User } from 'src/app/models/user.model';

export const apiGetUsersPaginated = createAction(
  '[USER API]  Api get user paginated...',
  props<{
    filter: string;
    sortDirection: string;
    sort: string;
    pageIndex: number;
    pageSize: number;
  }>()
);

export const getUsersPaginatedSuccess = createAction(
  '[USER]  Set users paginated success...',
  props<{ paginatedUsers: GetPaginatedUsers }>()
);

export const apiGetUserPaginatedError = createAction(
  '[USER API]  Api get user paginated ERROR...',
  props<{ error: any }>()
);

export const loading = createAction('[USER]  Loading users...');

export const apiGetUserById = createAction(
  '[USER API]  Api get user by id...',
  props<{
    id: number;
  }>()
);

export const setUserSelected = createAction(
  '[USER API]  Set user selected...',
  props<{
    user: User;
  }>()
);

export const getUserByIdError = createAction(
  '[USER API]  Error on get user by id...',
  props<{
    error: any;
  }>()
);
