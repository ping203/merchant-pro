import React, {Component} from 'react';

import Transfer from '../transfer/';
import CashIn from '../cashIn/';
import CashOut from '../cashOut';
import CashOutHistory from '../cashOutHistory';
import {StackNavigator, addNavigationHelpers, TabNavigator} from 'react-navigation';

const AppRouteConfigs = {
  cashIn: {
    screen: CashIn,
    title: `NẠP VÀNG`,
  },
  transfer: {screen: Transfer},
  cashOut: {screen: CashOut},
  cashOutHistory: {screen: CashOutHistory},
};
// const AppNavigator = TabNavigator(AppRouteConfigs);
const HomeNavigation = TabNavigator(AppRouteConfigs, {
  lazy: true,
  swipeEnabled: false,
  tabBarVisible: false,
  tabBarPosition : "bottom",
  initialRouteName : "cashIn",

  tabBarOptions: {
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
    // inactiveBackgroundColor : "#434973",

  }
});

export default HomeNavigation;
