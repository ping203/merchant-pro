import React, {Component} from 'react';
import {Text} from 'react-native';
import {IntlProvider} from 'react-intl';

import AppNavigator from './AppNavigator';

class App extends Component {

  render() {
    return <AppNavigator />;
    // return <IntlProvider locale="en" textComponent={Text}>
    //   <AppNavigator />
    // </IntlProvider>;
  }
}

export default App;
