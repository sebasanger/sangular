import { createAction, props } from '@ngrx/store';
import { UpdateAcountPayload } from 'src/app/interfaces/user/form-update-acount-payload';
import { UserCreateUpdatePayload } from 'src/app/interfaces/user/form-user.payload';
import { UpdatePasswordPayolad } from 'src/app/interfaces/user/update-password-payload';

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

export const deletUser = createAction(
  '[USER API]  Delete user...',
  props<{
    id: number;
  }>()
);

export const changeUserPassword = createAction(
  '[USER API]  Change user password...',
  props<{
    updatePasswordPayolad: UpdatePasswordPayolad;
  }>()
);

export const getUserDetails = createAction(
  '[USER API]  Get user details...',
  props<{
    id: number;
  }>()
);
