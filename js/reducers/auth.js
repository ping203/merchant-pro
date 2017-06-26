
// import type { Action } from '../actions/types';
import { LOGIN_SUCCESS, LOGOUT, UPDATE_GOLD, TOGGLE_SPIN } from '../actions/auth';


const initialState = {
  showSpin : false,
  isLogin: false,
  loginInfo : {}
};

export default function (state = initialState, action) {
  if (action.type === LOGIN_SUCCESS) {
    return {
      ...state,
      isLogin: true,
      loginInfo : action.loginInfo
    };
  }

  if (action.type === TOGGLE_SPIN) {
    return {
      ...state,
      showSpin : action.showSpin
    };
  }

  if (action.type === LOGOUT) {
    return {
      ...state,
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
