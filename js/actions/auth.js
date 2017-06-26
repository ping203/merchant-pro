import {AsyncStorage} from 'react-native';
import store from '../configureStore';
import { NavigationActions } from 'react-navigation';
export const TOGGLE_SPIN = 'TOGGLE_SPIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';
export const UPDATE_GOLD = 'UPDATE_GOLD';
import {getAppNavigator}  from '../AppRouteConfigs';
import {open_confirm_popup}  from './confirmPopup';
import {refreshHistoryCashOut}  from '../scenes/cashOutHistory/actions';
import {refreshHistoryTranfer}  from '../scenes/historyTransfer/actions';
import {refreshHistoryTranfer as refreshHistoryTranferMerchant}  from '../scenes/historyTransferMerchant/actions';
const AppNavigator = getAppNavigator();

export function toggle_spin(showSpin) {
  return {
    type: TOGGLE_SPIN,
    showSpin
  };
}

export function login_success(loginInfo) {
  return async function (dispatch) {
    await AsyncStorage.setItem('authData', JSON.stringify(loginInfo));
    dispatch({
      type: LOGIN_SUCCESS,
      loginInfo : loginInfo
    });
    dispatch(toggle_spin(false));
    if(!loginInfo.isTelephoneVerified){
      dispatch(open_confirm_popup());
    }
    // dispatch(NavigationActions.reset({
    //   index: 0,
    //   actions: [
    //     NavigationActions.navigate({ routeName: 'home'})
    //   ]
    // }));
    // dispatch(AppNavigator.router.getActionForPathAndParams('home'));
    dispatch(NavigationActions.navigate({ routeName: 'home'}));
  }
}

export function logout() {
  return async function (dispatch) {
    await AsyncStorage.removeItem('authData');
    dispatch({
      type: LOGOUT,
      loginInfo : {}
    });
    dispatch(toggle_spin(false));
    dispatch(refreshHistoryCashOut());
    dispatch(refreshHistoryTranfer());
    dispatch(refreshHistoryTranferMerchant());
    dispatch(AppNavigator.router.getActionForPathAndParams('login'));
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
