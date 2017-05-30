/**
 * Created by Admin on 5/29/2017.
 */
import React, {Component} from 'react';

import Login from './scenes/login/';
import Home from './scenes/home/';
import Transfer from './scenes/transfer/';
import CashIn from './scenes/cashIn/';
import HistoryTransfer from './scenes/historyTransfer';
import CashOut from './scenes/cashOut';
import MobileCards from './scenes/mobileCards';
import ItemsCashOut from './scenes/itemsCashOut';
import Merchants from './scenes/merchants';
import HistoryTransferMerchant from './scenes/historyTransferMerchant';
import CashOutHistory from './scenes/cashOutHistory';

import {StackNavigator, addNavigationHelpers, TabNavigator} from 'react-navigation';
import {connect} from 'react-redux';

// const AppRouteConfigs = {
//   login: {screen: Login},
//   cashIn: {screen: CashIn},
//   historyTransfer: {screen: HistoryTransfer},
//   transfer: {screen: Transfer},
//   cashOut: {screen: CashOut},
//   mobileCards: {screen: MobileCards},
//   itemsCashOut: {screen: ItemsCashOut},
//   merchants: {screen: Merchants},
//   historyTransferMerchant: {screen: HistoryTransferMerchant},
//   cashOutHistory: {screen: CashOutHistory},
// };

const AppRouteConfigs = {
  login: {screen: Login},
  home: {screen: Home},
};
// const AppNavigator = TabNavigator(AppRouteConfigs);
const AppNavigator = StackNavigator(AppRouteConfigs, {
  headerMode : "none",
  // lazy: true,
  // tabBarVisible: false,
  // swipeEnabled : false,
  // tabBarOptions: {
  //   showLabel: false,
  //   tabBarVisible: false
  // }
});

export function getAppRouteConfigs() {
  return AppRouteConfigs;
};

export function getAppNavigator() {
  return AppNavigator;
};

// export AppNavigator;

class App extends Component {
  render() {
    return (
      <AppNavigator navigation={addNavigationHelpers({
        dispatch: this.props.dispatch,
        state: this.props.nav,
      })}/>
    );
  }
}
const mapStateToProps = (state) => ({
  nav: state.nav
});

export default connect(mapStateToProps)(App);
