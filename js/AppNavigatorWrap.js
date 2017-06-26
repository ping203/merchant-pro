import React, {Component} from 'react';
import {StatusBar, StyleSheet, Dimensions, Platform, Navigator, Image, View} from 'react-native';
import {connect} from 'react-redux';
import {Drawer, Container, Button, Text} from 'native-base';

import {closeDrawer} from './actions/drawer';
import SideBar from './components/sideBar';
import {statusBarColor} from '../native-base-theme/variables/commonColor';

import AppNavigator from './AppRouteConfigs';
import {DrawerNavigator} from 'react-navigation';

export const DrawerNavigation = DrawerNavigator({
  wrapApp: {
    screen: AppNavigator,
  }
},{
  contentComponent : SideBar
});

const deviceHeight = Dimensions.get('window').height;

const wrapContainerStyle = {
  height: deviceHeight * 0.96,
  paddingTop: deviceHeight * 0.04,
  position: "relative",
  backgroundColor: "black",
};


class AppNavigatorWrap extends Component {

  render() {
    return (
      <Container style={(Platform.OS == "android" && Platform.Version < 20) ? wrapContainerStyle : {}}>
          <StatusBar
            // backgroundColor={statusBarColor}
            backgroundColor="black"
            barStyle="light-content"
            style={{height: 50}}
          />
          <DrawerNavigation />
      </Container>
    );
  }
}

export default AppNavigatorWrap;
