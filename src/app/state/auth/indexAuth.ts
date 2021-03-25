import {
  getIsUserAuthenticated,
  getUserRoles,
  getUserState,
} from './auth.selectors';
import {
  apiGetUserAuth,
  apiGetUserAuthError,
  getUserAuth,
} from './auth.actions';
import { authReducer, authFeatureKey } from './auth.reducer';
import { AuthEffects } from './auth.effects';
export const authRoot = {
  authReducer,
  getIsUserAuthenticated,
  getUserRoles,
  getUserState,
  apiGetUserAuth,
  apiGetUserAuthError,
  getUserAuth,
  authFeatureKey,
  AuthEffects,
};
