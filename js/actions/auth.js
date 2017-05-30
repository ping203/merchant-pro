import {AsyncStorage} from 'react-native';
import store from '../configureStore';
import { NavigationActions } from 'react-navigation';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';
export const UPDATE_GOLD = 'UPDATE_GOLD';

export function login_success(loginInfo) {

  return async function (dispatch) {
    await AsyncStorage.setItem('authData', JSON.stringify(loginInfo));
    dispatch({
      type: LOGIN_SUCCESS,
      loginInfo : loginInfo
    });
    dispatch(NavigationActions.navigate({
      routeName: 'home',
    }));
  }
}

export function logout() {
  return async function (dispatch) {
    await AsyncStorage.removeItem('authData');
    dispatch({
      type: LOGOUT,
      loginInfo : {}
    });
    dispatch(NavigationActions.navigate({
      routeName: 'login',
    }));
  }
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
