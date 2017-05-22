import React, {Component} from 'react';
import {Image, Platform, AsyncStorage, TouchableHighlight, View} from 'react-native';
import {connect} from 'react-redux';
import {Actions, ActionConst} from 'react-native-router-flux';
import {
  Container,
  Header,
  Title,
  Content,
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
import {logout} from '../../actions/auth';


const headerBg = require('../../../images/layout/header-bg.png');
const defaultAvatar = require('../../../images/avatars/default.png');

class HeaderComponent extends Component {

  render() {

    const {isActived, username, gold, mobile} = this.props;

    return (
      <Image source={headerBg} style={styles.headerContainer}>

        <View style={styles.headerInner}>

          <Button transparent onPress={this.props.openDrawer}>
            <Icon active name="menu" style={{fontSize: 30, lineHeight: 32}}/>
          </Button>
          <View style={styles.headerLeft}>
            <Text style={{color: '#c4e1ff',}}>{username}</Text>
            <Text style={{color: '#ffde00',}}>{gold}V</Text>
          </View>

          <Image source={defaultAvatar} resizeMode='cover' style={styles.headerAvatar}></Image>
          <View style={styles.headerRight}>
            {!isActived &&
            <Button onPress={this.props.openConfirmPopup} style={styles.buttonConfirm}>
              <Text style={{color: '#aac2f7'}}>Xác thực</Text>
            </Button>}
            {isActived && <Icon active name="ios-arrow-dropdown-circle" style={{width: 30, color: "#add329"}}/>}
            {isActived &&
            < Text style={{
              color: "#add329", flex: 1, flexDirection: 'row', justifyContent: "center", alignItems: "center"
            }}>
              {mobile}
            </Text>}
          </View>
        </View>
      </Image>


    );
  }
}

function bindAction(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
    openConfirmPopup: () => dispatch(open_confirm_popup()),
  };
}

const mapStateToProps = state => {
  const {loginInfo} = state.auth;
  return {
    isActived: loginInfo.isTelephoneVerified,
    username: loginInfo.username,
    gold: loginInfo.money || 0,
  }
};

export default connect(mapStateToProps, bindAction)(HeaderComponent);
