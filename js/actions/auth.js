import type { Action } from './types';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';

export function login_success(loginInfo) {
  return {
    type: LOGIN_SUCCESS,
    loginInfo : loginInfo
  };
}

export function logout() {
  return {
    type: LOGOUT,
    loginInfo : {}
  };
}
