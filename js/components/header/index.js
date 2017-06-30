import React, {Component} from 'react';
import {Image, Platform, AsyncStorage, TouchableHighlight, View} from 'react-native';
import {connect} from 'react-redux';
import {Actions, ActionConst} from 'react-native-router-flux';
import httpService from '../../common/http';
import {
  Button,
  Icon,
  List,
  ListItem,
  Text,
  Footer,
  Left,
  Right,
  Body,
  Item,
  Input
} from 'native-base';

import {openDrawer} from '../../actions/drawer';
import {open_confirm_popup} from '../../actions/confirmPopup';
import styles from './styles';
import NumberFormater from '../numberFormatter';
import {logout, update_gold} from '../../actions/auth';


const headerBg = require('../../../images/layout/header-bg.png');
const defaultAvatar = require('../../../images/ava.png');
import homeTabs from '../../scenes/home';
import {NavigationActions} from 'react-navigation'

class HeaderComponent extends Component {

  componentDidMount() {
    this.getGold().done();
  }

  getGold = async () => {
    var _self = this;
    httpService.postWithConvert("", {
      command: "get_money",
    }).then(async function (response) {
      if (!response.status) {
        _self.props.dispatch(update_gold(response.data.gold));
      }
    }).catch(function (thrown) {
    });
  };

  openDrawer() {
    this.props.appNavigation.navigate("DrawerOpen");
    // NavigationActions.navigate({ routeName: 'DrawerOpen'});
  }

  render() {

    const {isActived, username, money, telephone, hasBack, avtUrl} = this.props;

    return (
      <Image source={headerBg} style={styles.headerContainer}>

        <View style={styles.headerInner}>

          <View  style={styles.headerLeftWrapper}>

            {hasBack && <View style={styles.headerButtonLeftWrapper}>
              <Button style={styles.headerButtonLeft} transparent onPress={() => this.props.back()}>
                <Icon active name="md-arrow-dropleft-circle" style={{fontSize: 50, color: "#4fbde1"}}/>
              </Button>
            </View>}
            {!hasBack && <View style={styles.headerButtonLeftWrapper}>
              <Button transparent onPress={() => this.openDrawer.call(this)} style={styles.headerButtonLeft}>
                <Icon active name="menu" style={{fontSize: 30, lineHeight: 32}}/>
              </Button>
            </View>}
            <View style={styles.headerLeft}>
              <Text numberOfLines={1} ellipsizeMode="tail" style={{color: '#c4e1ff',}}>{username}</Text>
              <NumberFormater numberOfLines={1} ellipsizeMode="tail" style={{color: '#ffde00',}}
                              format="0,0">{money}V</NumberFormater>
            </View>
          </View>

          {avtUrl == null && <Image source={{uri: avtUrl}} resizeMode='cover' style={styles.headerAvatar}></Image>}
          {avtUrl !== null && <Image source={defaultAvatar} resizeMode='cover' style={styles.headerAvatar}></Image>}
          <View style={styles.headerRight}>
            {!isActived &&
            <Button onPress={this.props.openConfirmPopup} style={styles.buttonConfirm}>
              <Text style={{color: '#835238'}}>Xác thực</Text>
            </Button>
            }
            {isActived && <Icon active name="ios-arrow-dropdown-circle" style={{width: 30, color: "#add329"}}/>}
            {isActived &&
            < Text style={{
              color: "#add329", flex: 1, flexDirection: 'row', justifyContent: "center", alignItems: "center"
            }} numberOfLines={1}>
              {telephone}
            </Text>}
          </View>
          {/*</View>*/}
        </View>
      </Image>


    );
  }
}

function bindAction(dispatch) {
  return {
    back: () => dispatch(NavigationActions.back()),
    openDrawer: () => dispatch(openDrawer()),
    openConfirmPopup: () => dispatch(open_confirm_popup()),
  };
}

const mapStateToProps = state => {
  const {loginInfo} = state.auth;
  const {appNavigation} = state;
  return {
    isActived: loginInfo.isTelephoneVerified,
    username: loginInfo.username,
    telephone: loginInfo.telephone,
    avtUrl: loginInfo.avtUrl,
    money: loginInfo.money || 0,
    appNavigation
  }
};

export default connect(mapStateToProps, bindAction)(HeaderComponent);
