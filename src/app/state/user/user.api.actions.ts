import { createAction, props } from '@ngrx/store';

export const getUsersPaginated = createAction(
  '[USER API]  Api get user paginated...',
  props<{
    filter: string;
    sortDirection: string;
    sort: string;
    pageIndex: number;
    pageSize: number;
  }>()
);

export const getUserById = createAction(
  '[USER API]  Api get user by id...',
  props<{
    id: number;
  }>()
);
