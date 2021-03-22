import { createAction, props } from '@ngrx/store';
import { User } from '../models/user.model';

export const SET_USER = createAction(
  '[AUTH]  Set User...',
  props<{ user: User }>()
);

export const UPDATE_USER = createAction(
  '[AUTH]  Update user...',
  props<{ user: User }>()
);
