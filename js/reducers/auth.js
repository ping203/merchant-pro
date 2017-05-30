
// import type { Action } from '../actions/types';
import { LOGIN_SUCCESS, LOGOUT, UPDATE_GOLD } from '../actions/auth';


const initialState = {
  isLogin: false,
  loginInfo : {}
};

export default function (state = initialState, action) {
  if (action.type === LOGIN_SUCCESS) {
    return {
      isLogin: true,
      loginInfo : action.loginInfo
    };
  }

  if (action.type === LOGOUT) {
    return {
      isLogin: false,
      loginInfo : {}
    };
  }

  if (action.type === UPDATE_GOLD) {
    return {
      ...state,
      loginInfo : {
        ...state.loginInfo,
        money : action.gold
      }
    };
  }

  return state;
}
