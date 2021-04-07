import { createAction, props } from '@ngrx/store';
import { MenuItem } from 'src/app/interfaces/ui/menu.interface';

export const loadMenu = createAction('[MENU]  Load menu...');

export const setMenuItems = createAction(
  '[AUTH] Set menu items...',
  props<{ menuItems: MenuItem[] }>()
);
