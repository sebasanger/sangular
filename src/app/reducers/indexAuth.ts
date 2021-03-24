import {
  getIsUserAuthenticated,
  getUserRoles,
  getUserState,
} from '../selectors/auth.selectors';
import {
  apiGetUserAuth,
  apiGetUserAuthError,
  getUserAuth,
} from '../actions/auth.actions';
import { authReducer } from './auth.reducer';
import { AuthEffects } from '../effects/auth.effects';
export const fromRoot = {
  authReducer,
  getIsUserAuthenticated,
  getUserRoles,
  getUserState,
  apiGetUserAuth,
  apiGetUserAuthError,
  getUserAuth,
  AuthEffects,
};
