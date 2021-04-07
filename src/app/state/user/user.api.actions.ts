import { createAction, props } from '@ngrx/store';
import { UpdateAcountPayload } from 'src/app/interfaces/user/form-update-acount-payload';
import { UserCreateUpdatePayload } from 'src/app/interfaces/user/form-user.payload';

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

export const createUser = createAction(
  '[USER API]  Create user...',
  props<{
    userCreateUpdatePayload: UserCreateUpdatePayload;
  }>()
);

export const modifyUser = createAction(
  '[USER API]  Update user...',
  props<{
    userCreateUpdatePayload: UserCreateUpdatePayload;
  }>()
);

export const updateAcount = createAction(
  '[USER API]  Update acount...',
  props<{
    updateAcountPayload: UpdateAcountPayload;
  }>()
);
