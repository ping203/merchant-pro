/**
 * Created by Admin on 5/29/2017.
 */
import React, {Component} from 'react';
import Login from './scenes/login/';
// console.error("import Login from './scenes/login/' end", Login);
import Home from './scenes/home/';

import {StackNavigator, addNavigationHelpers, TabNavigator} from 'react-navigation';
import {connect} from 'react-redux';

const AppRouteConfigs = {
  login: {screen: Login},
  home: {screen: Home},
};

const AppNavigator = StackNavigator(AppRouteConfigs, {
  headerMode : "none",
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
