import React, {Component} from 'react';

import TransferTab from '../transferTab/';
import CashIn from '../cashIn/';
import CashOutTab from '../cashOutTab';
import CashOutHistory from '../cashOutHistory';
import {StackNavigator, addNavigationHelpers, TabNavigator} from 'react-navigation';

const AppRouteConfigs = {
  cashIn: {screen: CashIn},
  transferTab: {screen: TransferTab },
  cashOutTab: {screen: CashOutTab},
  cashOutHistory: {screen: CashOutHistory},
};
const HomeNavigation = TabNavigator(AppRouteConfigs, {
  lazy: true,
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


export function getHomeNavigation() {
  return HomeNavigation;
};

export default HomeNavigation;
