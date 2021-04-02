import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUser from './user.reducer';
import { userAdapter } from './user.reducer';
import { State } from './user.reducer';
export const {
  selectIds: _selectCustomerDataIds,
  selectEntities: _selectCustomerEntities,
  selectAll: _selectAllCustomer,
  selectTotal: _selectCustomerTotal,
} = userAdapter.getSelectors();

export const UserStateSelector = createFeatureSelector<State>(
  fromUser.userFeatureKey
);

export const selectUserIds = createSelector(
  UserStateSelector,
  _selectCustomerDataIds
);
export const selectUserEntities = createSelector(
  UserStateSelector,
  _selectCustomerEntities
);

export const selectAllUsers = createSelector(
  UserStateSelector,
  (state: State): any => state.paginatedUsers
);

export const selectUserError = createSelector(
  UserStateSelector,
  (state: State): boolean => state.error
);

export const selectUserLoading = createSelector(
  UserStateSelector,
  (state: State): boolean => state.loading
);

export const selectUserTotal = createSelector(
  UserStateSelector,
  (state: State): number => state.total
);
