
import type { Action } from './types';

export const OPEN_DRAWER = 'OPEN_DRAWER';
export const CLOSE_DRAWER = 'CLOSE_DRAWER';

export function openDrawer():Action {
  return async function (dispatch) {
    // dispatch(DrawerApp.router.getActionForPathAndParams('DrawerOpen'));
  }
}

export function closeDrawer():Action {
  return {
    type: CLOSE_DRAWER,
  };
}
