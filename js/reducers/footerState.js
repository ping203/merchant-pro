
// import type { Action } from '../actions/types';
import { CHANGE_FOOTER } from '../actions/footerState';


const initialState = "cashIn";

export default function (state = initialState, action) {
  if (action.type === CHANGE_FOOTER) {
    return  action.footerState;
  }

  return state;
}
