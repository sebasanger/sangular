import {
  getIsUserAuthenticated,
  getUserRoles,
  getUserAuth,
} from './auth.selectors';
import {
  apiGetUserAuth,
  apiGetUserAuthError,
  getUserAuthSuccess,
  apiUserAuthLogout,
  login,
  loginError,
  loginSuccess,
  userAuthLogout,
} from './auth.actions';
import { authReducer, authFeatureKey } from './auth.reducer';
import { AuthEffects } from './auth.effects';
export const authRoot = {
  authReducer,
  getIsUserAuthenticated,
  getUserRoles,
  getUserAuth,
  apiGetUserAuth,
  apiGetUserAuthError,
  getUserAuthSuccess,
  authFeatureKey,
  AuthEffects,
  apiUserAuthLogout,
  login,
  loginError,
  loginSuccess,
  userAuthLogout,
};
