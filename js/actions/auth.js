import type { Action } from './types';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';
export const UPDATE_GOLD = 'UPDATE_GOLD';

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

export function update_gold(gold) {
  return {
    type: UPDATE_GOLD,
    gold
  };
}
