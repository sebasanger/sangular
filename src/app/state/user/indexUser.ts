import {
  apiGetUserPaginatedError,
  apiGetUsersPaginated,
  getUsersPaginatedSuccess,
} from './user.actions';
import { UserEffects } from './user.effects';
import { userFeatureKey, userReducer } from './user.reducer';
import {
  UserStateSelector,
  getUserSelectedState,
  getUsersPaginatedState,
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
};
