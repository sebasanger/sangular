import { createAction, props } from '@ngrx/store';
import { GetPaginatedUsers } from 'src/app/interfaces/get-paginated-users';

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
