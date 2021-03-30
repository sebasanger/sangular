import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUser from './user.reducer';

export const UserStateSelector = createFeatureSelector<fromUser.State>(
  fromUser.userFeatureKey
);

export const getUserSelectedState = createSelector(
  UserStateSelector,
  (state: fromUser.State) => state.userSelected
);

export const getUsersPaginatedState = createSelector(
  UserStateSelector,
  (state: fromUser.State) => state.paginatedUsers.content
);
