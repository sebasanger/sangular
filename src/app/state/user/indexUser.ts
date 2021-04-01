import {
  apiGetUserPaginatedError,
  apiGetUsersPaginated,
  getUsersPaginatedSuccess,
  loading,
} from './user.actions';
import { UserEffects } from './user.effects';
import { userFeatureKey, userReducer } from './user.reducer';
import {
  UserStateSelector,
  getUserSelectedState,
  getUsersPaginatedState,
  getUsersLoadingState,
} from './user.selectors';
export const userRoot = {
  apiGetUserPaginatedError,
  apiGetUsersPaginated,
  getUsersPaginatedSuccess,
  UserEffects,
  userFeatureKey,
  userReducer,
  UserStateSelector,
  getUserSelectedState,
  getUsersPaginatedState,
  loading,
  getUsersLoadingState,
};
