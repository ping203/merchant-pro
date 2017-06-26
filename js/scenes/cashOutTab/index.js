import React, {Component} from 'react';

import CashOut from '../cashOut/';
import MobileCards from '../mobileCards/';
import ItemsCashOut from '../itemsCashOut/';
import Merchants from '../merchants/';
import HistoryTransferMerchant from '../historyTransferMerchant/';

import {StackNavigator, addNavigationHelpers, TabNavigator} from 'react-navigation';

const AppRouteConfigs = {
  cashOut: {screen: CashOut},
  mobileCards: {screen: MobileCards},
  itemsCashOut : {screen : ItemsCashOut},
  merchants : {screen : Merchants},
  historyTransferMerchant : {screen : HistoryTransferMerchant}
};

const CashOutTab = StackNavigator(AppRouteConfigs, {
  headerMode: "none",
  navigationOptions: {
    title: "QUÀ TẶNG"
  }
});

export function getTransferTabNavigation() {
  return TransferTab;
};

export default CashOutTab;
