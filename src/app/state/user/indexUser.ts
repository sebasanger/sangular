import {
  apiGetUserPaginatedError,
  apiGetUsersPaginated,
  getUsersPaginatedSuccess,
  apiGetUserById,
  getUserByIdError,
  setUserSelected,
} from './user.actions';
import { UserEffects } from './user.effects';
import { userFeatureKey, userReducer } from './user.reducer';
export const userRoot = {
  apiGetUserPaginatedError,
  apiGetUsersPaginated,
  getUsersPaginatedSuccess,
  UserEffects,
  userFeatureKey,
  userReducer,
  apiGetUserById,
  getUserByIdError,
  setUserSelected,
};
