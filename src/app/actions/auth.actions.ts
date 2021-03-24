import { createAction, props } from '@ngrx/store';
import { User } from '../models/user.model';

export const getUserAuth = createAction(
  '[AUTH]  Set User...',
  props<{ user: User }>()
);

export const apiGetUserAuth = createAction('[AUTH API]  Api get user auth...');

export const apiGetUserAuthError = createAction(
  '[AUTH API]  Api get user auth ERROR...',
  props<{ error: any }>()
);

export const apiUserAuthLogout = createAction('[AUTH API]  Logout user...');

export const userAuthLogout = createAction('[AUTH]  Logout user...');
