
// import type { Action } from '../actions/types';
import { LOGIN_SUCCESS, LOGOUT } from '../actions/auth';


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
      isLogin: true,
      loginInfo : {}
    };
  }

  return state;
}
