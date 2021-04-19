import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './menu.actions';
import { MenuItem } from '../../interfaces/ui/menu.interface';

export const authFeatureKey = 'menu';
export interface State {
  menu: MenuItem[];
  title: string;
}

const initState: State = {
  menu: null,
  title: 'Sangular',
};

export const menuReducer = createReducer(
  initState,
  on(AuthActions.setMenuItems, (state, { menuItems }) => ({
    ...state,
    menu: menuItems,
  })),
  on(AuthActions.setPageTitle, (state, { title }) => ({
    ...state,
    title: title,
  }))
);
