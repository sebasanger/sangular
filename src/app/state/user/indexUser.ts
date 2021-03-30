import {
  apiGetUserPaginatedError,
  apiGetUsersPaginated,
  getUsersPaginatedSuccess,
} from './user.actions';
import { UserEffects } from './user.effects';
import { userFeatureKey, userReducer } from './user.reducer';
import {} from './user.selectors';
export const userRoot = {
  apiGetUserPaginatedError,
  apiGetUsersPaginated,
  getUsersPaginatedSuccess,
  UserEffects,
  userFeatureKey,
  userReducer,
};
