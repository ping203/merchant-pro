import React, {Component} from 'react';

import TransferTab from '../transferTab/';
import CashIn from '../cashIn/';
import CashOutTab from '../cashOutTab';
import CashOutHistory from '../cashOutHistory';
import {StackNavigator, addNavigationHelpers, TabNavigator, NavigationActions} from 'react-navigation';
import store from '../../configureStore';
import {open_confirm_popup} from '../../actions/confirmPopup';
import TabButton from './tabButton';

const AppRouteConfigs = {
  cashIn: {screen: CashIn},
  transferTab: {screen: TransferTab },
  cashOutTab: {screen: CashOutTab},
  cashOutHistory: {screen: CashOutHistory},
};
const HomeNavigation = TabNavigator(AppRouteConfigs, {
  // tabBarComponent : TabButton,
  // lazy: true,
  swipeEnabled: false,
  tabBarVisible: false,
  tabBarPosition : "bottom",
  initialRouteName : "cashIn",
  backBehavior : "cashOutTab",
  // backBehavior : "cashOutTab",

  tabBarOptions: {
    initialRouteName : "cashIn",
    tabBarVisible: false,
    activeTintColor: 'white',
    labelStyle: {
      fontSize: 10,
      fontWeight : "bold",
      color : "#b6e4ff",
        marginBottom : 15
    },
    style: {
      backgroundColor: '#1c6f91',
      // flex  : 1
    },
    activeBackgroundColor : "#aa8b1d",
    indicatorStyle : {
      backgroundColor: '#aa8b1d',
      height : 100
    }
  }
});


export function getHomeNavigation() {
  return HomeNavigation;
};

const defaultGetStateForAction = HomeNavigation.router.getStateForAction;

HomeNavigation.router.getStateForAction = (action, state) => {
  var storeData = Object.assign({},store.getState());
  var isActived = storeData.auth.loginInfo.isTelephoneVerified;
  var isLogin = storeData.auth.isLogin;
  if(isLogin && !isActived && action.routeName!="cashIn"){
    setTimeout(()=>{
      store.dispatch(open_confirm_popup());
    },0);
    return defaultGetStateForAction(HomeNavigation.router.getActionForPathAndParams('cashIn'), state);
  }
  return defaultGetStateForAction(action, state);
}

export default HomeNavigation;
