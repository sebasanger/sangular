import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './menu.actions';
import { MenuItem } from '../../interfaces/ui/menu.interface';

export const authFeatureKey = 'menu';
export interface State {
  menu: MenuItem[];
}

const initState: State = {
  menu: null,
};

export const menuReducer = createReducer(
  initState,
  on(AuthActions.setMenuItems, (state, { menuItems }) => ({
    ...state,
    menu: menuItems,
  }))
);
