import { createAction, props } from '@ngrx/store';
import { GetPaginatedUsers } from 'src/app/interfaces/user/get-paginated-users';
import { User } from 'src/app/models/user.model';
import { Update, EntityMap, EntityMapOne, Predicate } from '@ngrx/entity';

export const setPaginatedUsers = createAction(
  '[USER]  Set users paginated success...',
  props<{ paginatedUsers: GetPaginatedUsers }>()
);
export const setErrors = createAction(
  '[USER]  Set users paginated success...',
  props<{ error: any }>()
);
export const loadUsers = createAction(
  '[User/API] Load Users',
  props<{ users: User[] }>()
);
export const selectUser = createAction(
  '[User/API] Set selected user',
  props<{ user: User }>()
);
export const addUser = createAction(
  '[User/API] Add User',
  props<{ user: User }>()
);
export const setUser = createAction(
  '[User/API] Set User',
  props<{ user: User }>()
);
export const upsertUser = createAction(
  '[User/API] Upsert User',
  props<{ user: User }>()
);
export const addUsers = createAction(
  '[User/API] Add Users',
  props<{ users: User[] }>()
);
export const upsertUsers = createAction(
  '[User/API] Upsert Users',
  props<{ users: User[] }>()
);
export const updateUser = createAction(
  '[User/API] Update User',
  props<{ update: Update<User> }>()
);
export const updateUsers = createAction(
  '[User/API] Update Users',
  props<{ updates: Update<User>[] }>()
);
export const mapUser = createAction(
  '[User/API] Map User',
  props<{ entityMap: EntityMapOne<User> }>()
);
export const mapUsers = createAction(
  '[User/API] Map Users',
  props<{ entityMap: EntityMap<User> }>()
);
export const deleteUser = createAction(
  '[User/API] Delete User',
  props<{ id: number }>()
);
export const deleteUsers = createAction(
  '[User/API] Delete Users',
  props<{ ids: number[] }>()
);
export const deleteUsersByPredicate = createAction(
  '[User/API] Delete Users By Predicate',
  props<{ predicate: Predicate<User> }>()
);
export const clearUsers = createAction('[User/API] Clear Users');
