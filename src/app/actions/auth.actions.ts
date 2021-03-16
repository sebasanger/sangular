import { createAction, props } from '@ngrx/store';
import { User } from '../models/user.model';

export const SET_USER = createAction(
  '[AUTH]  Set User...',
  props<{ user: User }>()
);
