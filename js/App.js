import React, {Component} from 'react';
import {Text} from 'react-native';
import {IntlProvider} from 'react-intl';

import AppNavigatorWrap from './AppNavigatorWrap';

class App extends Component {

  render() {
    return <AppNavigatorWrap />;
    // return <IntlProvider locale="en" textComponent={Text}>
    //   <AppNavigator />
    // </IntlProvider>;
  }
}

export default App;
