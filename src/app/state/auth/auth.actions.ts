import { createAction, props } from '@ngrx/store';
import { LoginRequestPayload } from 'src/app/interfaces/auth/login-request.payload';
import { UpdateAcountPayload } from 'src/app/interfaces/user/form-update-acount-payload';
import { UpdatePasswordPayolad } from 'src/app/interfaces/user/update-password-payload';
import { User } from '../../models/user.model';

export const apiGetUserAuth = createAction('[AUTH API]  Api get user auth...');

export const getUserAuthSuccess = createAction(
  '[AUTH]  Set User success...',
  props<{ user: User }>()
);

export const apiGetUserAuthError = createAction(
  '[AUTH API]  Api get user auth ERROR...',
  props<{ error: any }>()
);

export const login = createAction(
  '[AUTH API]  Login user...',
  props<{ payload: LoginRequestPayload }>()
);

export const loginSuccess = createAction(
  '[AUTH]  Login success...',
  props<{ user: User }>()
);

export const loginError = createAction(
  '[AUTH API]  Login error...',
  props<{ error: any }>()
);

export const apiUserAuthLogout = createAction('[AUTH API]  Logout user...');

export const userAuthLogout = createAction('[AUTH]  Logout user...');

export const updateAcount = createAction(
  '[USER API]  Update acount...',
  props<{
    updateAcountPayload: UpdateAcountPayload;
  }>()
);

export const changeUserPassword = createAction(
  '[USER API]  Change user password...',
  props<{
    updatePasswordPayolad: UpdatePasswordPayolad;
  }>()
);
