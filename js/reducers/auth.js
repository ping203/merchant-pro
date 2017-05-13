
// import type { Action } from '../actions/types';
import { LOGIN, LOGOUT } from '../actions/auth';


const initialState = {
  isLogin: false,
  loginInfo : {}
};

export default function (state = initialState, action) {
  if (action.type === LOGIN) {
    return {
      ...state,
      drawerState: 'opened',
    };
  }

  if (action.type === LOGOUT) {
    return {
      ...state,
      drawerState: 'closed',
    };
  }

  return state;
}
