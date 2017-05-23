import {AsyncStorage} from 'react-native';
import store from '../configureStore';
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

function update_gold_redux(gold) {
  return {
    type: UPDATE_GOLD,
    gold
  };
}

export function update_gold(gold) {
  return async function (dispatch) {
    var storeData = Object.assign({},store.getState());
    storeData.auth.loginInfo.money = gold;
    const a = await AsyncStorage.setItem('authData', JSON.stringify(storeData.auth.loginInfo));
    dispatch(update_gold_redux(gold));
  }
}
