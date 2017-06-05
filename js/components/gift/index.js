import React, {Component} from 'react';
import {Image, AsyncStorage, View} from 'react-native';
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
  Body
} from 'native-base';

import {openDrawer} from '../../actions/drawer';
import FooterComponent from './../footer';
import styles from './styles';
import {logout} from '../../actions/auth';


const glow2 = require('../../../images/glow2-new.png');
const headerBg = require('../../../images/layout/header-bg.png');
const defaultAvatar = require('../../../images/avatars/default.png');

class Home extends Component {  //eslint-disable-line

  static propTypes = {
    openDrawer: React.PropTypes.func,
  }



  logout() {
    var _self = this;
    _logout();
    async function _logout() {
      try {
        await AsyncStorage.removeItem('authData');
        _self.props.dispatch(logout());
        Actions.login({type: ActionConst.RESET});
        // Actions.home();
      } catch (error) {
        console.log("logout error", error);
      }
    };

  }

  render() {
    const {isActived, username, gold, mobile} = this.props;
    return (
      <Container style={{backgroundColor: '#2a3146'}}>
        <Image source={glow2} style={styles.container}>
          <View style={styles.headerContainer}>
            <Image source={headerBg} resizeMode='cover' style={styles.headerBg}/>
            <View style={styles.headerInner}>
              <View style={styles.headerLeft}>
                <Text style={{color: '#c4e1ff',}}>{username}</Text>
                <Text style={{color: '#ffde00',}}>{gold}V</Text>
              </View>

              <Image source={defaultAvatar} resizeMode='cover' style={styles.headerAvatar}></Image>
              <View style={styles.headerRight}>
                {!isActived &&
                <Button style={{backgroundColor: "#ddd",  height: 30}}>
                  <Text style={{color: '#999'}}>Xác thực</Text>
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
          </View>

          <Content padder style={{backgroundColor: 'transparent'}}>

            <ListItem icon style={styles.listitem}>
              <Left>
                <Icon active name="megaphone" style={{width: 30}}/>
              </Left>
              <Body>
              <Text>Discussion With Client</Text>
              </Body>
              <Right>
                <Text style={{fontWeight: '400', paddingTop: 18}} note>8:00 AM</Text>
              </Right>
            </ListItem>
            <ListItem icon style={styles.listitem}>
              <Left>
                <Icon active name="people" style={{width: 30}}/>
              </Left>
              <Body>
              <Text >Daily Stand Up</Text>
              </Body>
              <Right>
                <Text style={{fontWeight: '400', paddingTop: 18}} note>10:00 AM</Text>
              </Right>
            </ListItem>
            <ListItem icon style={styles.listitem}>
              <Left>
                <Icon active name="flag" style={{width: 30}}/>
              </Left>
              <Body>
              <Text>Finish list Screen</Text>
              </Body>
              <Right>
                <Text style={{fontWeight: '400', paddingTop: 18}} note>By 2:00 PM</Text>
              </Right>
            </ListItem>
            <ListItem icon style={styles.listitem}>
              <Left>
                <Icon active name="restaurant" style={{width: 30}}/>
              </Left>
              <Body>
              <Text>Lunch Break</Text>
              </Body>
              <Right>
                <Text style={{fontWeight: '400', paddingTop: 18}} note>2:00 PM</Text>
              </Right>
            </ListItem>
            <Button
              style={styles.roundedButton}
              onPress={() => this.logout()}
            >
              <Icon active name="close" style={styles.closeIcon}/>
            </Button>
          </Content>

          <Footer style={{borderTopWidth: 0, backgroundColor: 'transparent'}}>
            <FooterComponent navigator={this.props.navigation}/>
          </Footer>
        </Image>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
  };
}

const mapStateToProps = state => {
  const {loginInfo} = state.auth;
  return {
    isActived: loginInfo.isTelephoneVerified,
    username: loginInfo.username,
    gold: loginInfo.gold || 0,
  }
};

export default connect(mapStateToProps, bindAction)(Home);
