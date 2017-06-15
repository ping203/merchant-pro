import React, {Component} from 'react';

import TransferTab from '../transferTab/';
import news from '../news/';
import OTP from '../otp/';
import CashOutTab from '../cashOutTab';
import CashOutHistory from '../cashOutHistory';
import {TabNavigator} from 'react-navigation';
import store from '../../configureStore';
import {open_confirm_popup} from '../../actions/confirmPopup';

const AppRouteConfigs = {
  news: {screen: news},
  otp: {screen: OTP},
  cashOutHistory: {screen: CashOutHistory},
};
const HomeNavigation = TabNavigator(AppRouteConfigs, {
  swipeEnabled: false,
  tabBarVisible: false,
  tabBarPosition : "bottom",
  initialRouteName : "news",
  backBehavior : "news",

  tabBarOptions: {
    initialRouteName : "cashIn",
    tabBarVisible: false,
    activeTintColor: 'white',
    labelStyle: {
      fontSize: 10,
      fontWeight : "bold",
      color : "#676da6"
    },
    style: {
      backgroundColor: '#434973',
      // flex  : 1
    },
    activeBackgroundColor : "#3a3f6c",
    indicatorStyle : {
      backgroundColor: '#3a3f6c',
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
  if(isLogin && !isActived && action.routeName!="news"){
    setTimeout(()=>{
      store.dispatch(open_confirm_popup());
    },0);
    return defaultGetStateForAction(HomeNavigation.router.getActionForPathAndParams('news'), state);
  }
  return defaultGetStateForAction(action, state);
}

export default HomeNavigation;
