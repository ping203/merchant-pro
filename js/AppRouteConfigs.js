import React, {Component} from 'react';
import Login from './scenes/login/';
import Home from './scenes/home/';
import {update_app_navigation} from './actions/nav';

import {StackNavigator, addNavigationHelpers, TabNavigator} from 'react-navigation';
import {connect} from 'react-redux';

const AppRouteConfigs = {
  login: {screen: Login},
  home: {screen: Home},
};

const AppNavigator = StackNavigator(AppRouteConfigs, {
  headerMode: "none",
});

export function getAppRouteConfigs() {
  return AppRouteConfigs;
};

export function getAppNavigator() {
  return AppNavigator;
};

// export AppNavigator;

class App extends Component {

  componentDidMount() {
    this.props.dispatch(update_app_navigation(this.props.navigation));
  }

  render() {
    return (
      <AppNavigator
        navigation={addNavigationHelpers({
          dispatch: this.props.dispatch,
          state: this.props.nav,
        })}
      />
    );
  }
}
const mapStateToProps = (state) => ({
  nav: state.nav
});

export default connect(mapStateToProps)(App);
