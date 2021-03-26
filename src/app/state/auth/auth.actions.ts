import { createAction, props } from '@ngrx/store';
import { LoginRequestPayload } from 'src/app/interfaces/login-request.payload';
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
