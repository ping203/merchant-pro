
import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { Drawer } from 'native-base';
import { Router, Scene } from 'react-native-router-flux';

import { closeDrawer } from './actions/drawer';

import Login from './components/login/';
import Home from './components/home/';
import CashIn from './components/cashIn/';
import SignUp from './components/sign-up/';
import Inbox from './components/inbox/';
import Mail from './components/mail/';
import Compose from './components/compose/';
import Lists from './components/lists/';
import Icons from './components/icons/';
import ProgressBar from './components/progressbar/';
import Spinner from './components/spinner/';
import Contacts from './components/contact/';
import Calendar from './components/calendar/';
import Form from './components/form/';
import Modal from './components/modal/';
import SideBar from './components/sideBar';
import { statusBarColor } from '../native-base-theme/variables/commonColor';


const RouterWithRedux = connect()(Router);

class AppNavigator extends Component {

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
      <Drawer
        ref={(ref) => { this._drawer = ref; }}
        type="overlay"
        tweenDuration={150}
        content={<SideBar navigator={this._navigator} />}
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
            drawer: { shadowRadius: ratio < 0.2 ? ratio * 5 * 5 : 5 },
            main: {
              opacity: (2 - ratio) / 2,
            },
          };
        }}
        negotiatePan
      >
        <StatusBar
          backgroundColor={statusBarColor}
          barStyle="light-content"
        />
        <RouterWithRedux>
          <Scene key="root">
            <Scene key="login" component={Login} hideNavBar initial />
            <Scene key="signUp" component={SignUp} />
            <Scene key="home" component={Home} />
            <Scene key="cashIn" component={CashIn} />
            <Scene key="tranfer" component={Contacts} />
            <Scene key="gift" component={Mail} />
            <Scene key="reveice" component={Lists} />
            <Scene key="inbox" component={Inbox} />
            <Scene key="compose" component={Compose} />
            <Scene key="mail" component={Mail} />
            <Scene key="lists" component={Lists} />
            <Scene key="icons" component={Icons} />
            <Scene key="progressBar" component={ProgressBar} />
            <Scene key="spinners" component={Spinner} />
            <Scene key="contacts" component={Contacts} />
            <Scene key="calendar" component={Calendar} />
            <Scene key="form" component={Form} />
            <Scene key="modal" component={Modal} />
          </Scene>
        </RouterWithRedux>
      </Drawer>
    );
  }
}

function bindAction(dispatch) {
  return {
    closeDrawer: () => dispatch(closeDrawer()),
  };
}

const mapStateToProps = state => ({
  drawerState: state.drawer.drawerState,
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(AppNavigator);
