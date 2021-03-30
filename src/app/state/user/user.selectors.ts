import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuth from './user.reducer';

export const UserStateSelector = createFeatureSelector<fromAuth.State>(
  fromAuth.userFeatureKey
);

export const getUserState = createSelector(
  UserStateSelector,
  (state: fromAuth.State) => state.user
);
