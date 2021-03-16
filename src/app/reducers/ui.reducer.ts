import { createReducer, on } from '@ngrx/store';
import * as fromUI from '../actions/ui.actions';

export interface State {
  isLoading: boolean;
}

const initState: State = {
  isLoading: false,
};

const _uiReducer = createReducer(
  initState,
  on(fromUI.ACTVATE_LOADING, (state) => ({ isLoading: true })),
  on(fromUI.DISABLE_LOADING, (state) => ({ isLoading: false }))
);

export function uiReducer(state: State, action: any) {
  return _uiReducer(state, action);
}
