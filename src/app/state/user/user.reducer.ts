import { Action, createReducer, on } from '@ngrx/store';
import * as UserActions from './user.actions';
import { User } from '../../models/user.model';
import { GetPaginatedUsers } from 'src/app/interfaces/user/get-paginated-users';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { HttpErrorResponse } from '@angular/common/http';

export const userFeatureKey = 'user';

export const userAdapter: EntityAdapter<User> = createEntityAdapter<User>();

export interface State extends EntityState<User> {
  paginatedUsers: GetPaginatedUsers;
  selectedUserId: number | null;
  selectedUser: User;
  error: HttpErrorResponse;
  loading: boolean;
}
export const initialState: State = userAdapter.getInitialState({
  paginatedUsers: null,
  selectedUserId: null,
  selectedUser: null,
  error: null,
  loading: false,
});

export const userReducer = createReducer(
  initialState,
  on(UserActions.setPaginatedUsers, (state, { paginatedUsers }) => ({
    ...state,
    paginatedUsers,
    error: null,
    loading: false,
  })),
  on(UserActions.setErrors, (state, { error }) => ({
    ...state,
    error: error,
  })),

  on(UserActions.addUser, (state, { user }) => {
    return userAdapter.addOne(user, state);
  }),
  on(UserActions.setUser, (state, { user }) => {
    return userAdapter.setOne(user, state);
  }),
  on(UserActions.selectUser, (state, { user }) => {
    return userAdapter.setOne(user, state);
  }),
  on(UserActions.upsertUser, (state, { user }) => {
    return userAdapter.upsertOne(user, state);
  }),
  on(UserActions.addUsers, (state, { users }) => {
    return userAdapter.addMany(users, state);
  }),
  on(UserActions.upsertUsers, (state, { users }) => {
    return userAdapter.upsertMany(users, state);
  }),
  on(UserActions.updateUser, (state, { update }) => {
    return userAdapter.updateOne(update, state);
  }),
  on(UserActions.updateUsers, (state, { updates }) => {
    return userAdapter.updateMany(updates, state);
  }),
  on(UserActions.mapUser, (state, { entityMap }) => {
    return userAdapter.mapOne(entityMap, state);
  }),
  on(UserActions.mapUsers, (state, { entityMap }) => {
    return userAdapter.map(entityMap, state);
  }),
  on(UserActions.deleteUser, (state, { id }) => {
    return userAdapter.removeOne(id, state);
  }),
  on(UserActions.deleteUsers, (state, { ids }) => {
    return userAdapter.removeMany(ids, state);
  }),
  on(UserActions.deleteUsersByPredicate, (state, { predicate }) => {
    return userAdapter.removeMany(predicate, state);
  }),
  on(UserActions.loadUsers, (state, { users }) => {
    return userAdapter.setAll(users, state);
  }),
  on(UserActions.clearUsers, (state) => {
    return userAdapter.removeAll({
      ...state,
      selectedUserId: null,
      selectedUser: null,
    });
  }),
  on(UserActions.selectUser, (state, { user }) => {
    return userAdapter.removeAll({ ...state, selectedUser: user });
  })
);

export function reducer(state: State | undefined, action: Action) {
  return userReducer(state, action);
}

export const getSelectedUserId = (state: State) => state.selectedUserId;

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = userAdapter.getSelectors();

// select the array of user ids
export const selectUserIds = selectIds;

// select the dictionary of user entities
export const selectUserEntities = selectEntities;

// select the array of users
export const selectAllUsers = selectAll;

// select the total user count
export const selectUserTotal = selectTotal;
