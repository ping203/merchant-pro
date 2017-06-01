import React, {Component} from 'react';

import Transfer from '../transfer/';
import HistoryTransfer from '../historyTransfer/';
import {StackNavigator, addNavigationHelpers, TabNavigator} from 'react-navigation';

const AppRouteConfigs = {
  transfer: {screen: Transfer},
  historyTransfer: {screen: HistoryTransfer},
};

const TransferTab = StackNavigator(AppRouteConfigs, {
  headerMode: "none",
  navigationOptions: {
    title: "CHUYỂN VÀNG"
  }
});

export function getTransferTabNavigation() {
  return TransferTab;
};

export default TransferTab;
