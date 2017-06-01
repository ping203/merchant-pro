import React, {Component} from 'react';
import {StatusBar, StyleSheet, Dimensions, Platform,Navigator} from 'react-native';
import {connect} from 'react-redux';
import {Drawer, Container} from 'native-base';

import {closeDrawer} from './actions/drawer';
import SideBar from './components/sideBar';
import {statusBarColor} from '../native-base-theme/variables/commonColor';

import AppNavigator from './AppRouteConfigs';

const deviceHeight = Dimensions.get('window').height;

const wrapContainerStyle = {
  height: deviceHeight * 0.96,
  paddingTop: deviceHeight * 0.04,
  position: "relative",
  backgroundColor: "black",
};


class AppNavigatorWrap extends Component {

  static propTypes = {
    drawerState: React.PropTypes.string,
    closeDrawer: React.PropTypes.func,
  }


  componentDidUpdate() {
    if (this.props.drawerState === 'opened') {
      this.openDrawer();
    }

    if (this.props.drawerState === 'closed') {
      this._drawer._root.close();
    }
  }


  openDrawer() {
    this._drawer._root.open();
  }

  closeDrawer() {
    if (this.props.drawerState === 'opened') {
      this.props.closeDrawer();
    }
  }


  render() {
    return (
      <Container style={wrapContainerStyle}>
        <Drawer
          ref={(ref) => {
            this._drawer = ref;
          }}
          type="overlay"
          tweenDuration={150}
          content={<SideBar navigator={this._navigator}/>}
          tapToClose
          acceptPan={false}
          onClose={() => this.closeDrawer()}
          openDrawerOffset={0.2}
          panCloseMask={0.2}
          styles={{
            drawer: {
              shadowColor: '#000000',
              shadowOpacity: 0.8,
              shadowRadius: 3,
            },
          }}
          tweenHandler={(ratio) => {  //eslint-disable-line
            return {
              drawer: {shadowRadius: ratio < 0.2 ? ratio * 5 * 5 : 5},
              main: {
                opacity: (2 - ratio) / 2,
              },
            };
          }}
          negotiatePan
        >
          <StatusBar
            // backgroundColor={statusBarColor}
            backgroundColor="red"
            barStyle="light-content"
            style={{height: 50}}
          />
          <AppNavigator/>
        </Drawer>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    closeDrawer: () => dispatch(closeDrawer()),
  };
}

const mapStateToProps = state => ({
  drawerState: state.drawer.drawerState
});

export default connect(mapStateToProps, bindAction)(AppNavigatorWrap);
