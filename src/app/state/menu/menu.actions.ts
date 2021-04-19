import { createAction, props } from '@ngrx/store';
import { MenuItem } from 'src/app/interfaces/ui/menu.interface';

export const loadMenu = createAction('[MENU]  Load menu...');

export const setMenuItems = createAction(
  '[MENU] Set menu items...',
  props<{ menuItems: MenuItem[] }>()
);

export const setPageTitle = createAction(
  '[MENU] Set title...',
  props<{ title: string }>()
);
