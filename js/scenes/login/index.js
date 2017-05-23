import React, {Component} from 'react';
import {Image, Platform, AsyncStorage, TouchableHighlight} from 'react-native';
import {connect} from 'react-redux';
import {Actions, ActionConst} from 'react-native-router-flux';
import {Container, Content, Text, Item, Input, Button, Icon, View, Form} from 'native-base';
import httpService from '../../common/http';
import {Facebook} from 'expo';
import { login_success } from '../../actions/auth';

import styles from './styles';


const backgroundImage = require('../../../images/glow2-old.png');
const logo = require('../../../images/logo.png');
const facebookButton = require('../../../images/facebook-button.png');
import { change_footer } from '../../actions/footerState';


class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errorMessage: '',
      onExp : false
    };
  }

  componentDidMount() {
    this._loadInitialState().done();
  }

  _loadInitialState = async () => {
    var _self = this;
    try {
      var value = await AsyncStorage.getItem("authData");
      if (value !== null) {
        var authData = JSON.parse(value);
        if (new Date().getTime() < authData.exp) {
          _self.goHome(authData);
        }
      } else {
        console.log("Initialized with no selection on disk.");
      }
    } catch (error) {
      _self.setError('AsyncStorage error: ' + error.message);
    }
  };

  checkState() {
    getLocalState()
    async function getLocalState() {
      try {
        const value = await
          AsyncStorage.getItem('@MySuperStore:key');
        if (value !== null) {
          // We have data!!
          this.state = {
            username: '',
            password: '',
            scroll: false,
            errorMessage: ''
          };
          console.log(value);
        }
      } catch (error) {
        _self.setError(thrown);
      }
    }


  }


  login() {
    var _self = this;
    httpService.post("", {
      command: "login",
      type: "normal",
      username: this.state.username, //ndn199101
      password: this.state.password //ndn123456

    }).then(async function (response) {
      var data = response.data;
      if (data.status) {
        _self.setError(data.message);
      } else {
        _self.setError("");
        var accessToken = data.data && data.data.accessToken;
        if (accessToken) {
          try {
            const a = await AsyncStorage.setItem('authData', JSON.stringify(data.data));
            console.log("set Item success");
            _self.goHome(data.data);
          } catch (error) {
            console.log("error", error);
            _self.setError(error);
          }
        }
      }
    }).catch(function (thrown) {
      console.log('thrown.message login', thrown);
      _self.setError(thrown);
    });

  }

  goHome(loginData){
    this.props.dispatch(login_success(loginData));
    // this.props.dispatch(change_footer("cashIn"));
    // Actions.cashIn();
    // Actions.cashIn({type: ActionConst.RESET});
    // this.props.dispatch(change_footer("transfer"));
    // Actions.historyTransfer();
    this.props.dispatch(change_footer("cashOut"));
    Actions.cashOut();
    // this.props.dispatch(change_footer("transfer"));
    // Actions.transfer();
  }

  loginFacebook() {
    var _self = this;
    console.log("loginfacebook");
    logIn();
    async function logIn() {
      const {type, token} = await Facebook.logInWithReadPermissionsAsync('1472518432772370', {
        permissions: ['public_profile'],
      });
      if (type === 'success') {
        console.log("type, token", type, token);
        _self.loginWidthToken(token);
        // const response = await fetch(
        //   `https://graph.facebook.com/me?access_token=${token}`);
        // Alert.alert(
        //   'Logged in!',
        //   `Hi ${(await response.json()).name}!`,
        // );
      } else {
        console.log("hihii");
      }
    }
  }

  loginWidthToken(token) {
    var _self = this;
    console.log("this", this.setError, _self.setError);
    httpService.post("", {
      command: "login",
      type: "facebook",
      accessToken: token
    }).then(function (response) {
      var data = response.data;
      if (data.status) {
        console.log("data", data);
        _self.setError(data.message);
      } else {
        _self.setError("");
        Actions.home();
      }
      console.log(response.data);
    }).catch(function (thrown) {
      console.log('thrown.message loginWidthToken', thrown);
      _self.setError(thrown);
    });
  }


  setError(message) {
    this.setState(prevState => ({
      errorMessage: message
    }));
  }

  render() {
    return (
      <Container>

        <Content style={{backgroundColor: '#2a3146'}}>
          <Image source={backgroundImage} style={styles.container}>
            {/*<View style={styles.shadow}>*/}
            <View style={styles.bg}>
              <Image source={logo} resizeMode='cover' style={styles.logo}/>
              {/*<Item underline style={{marginBottom: 20}}>*/}
              <View style={styles.innerView}>

                <Item style={styles.inputWrapper}>
                  {/*<Icon active name="person"/>*/}
                  <Icon active name="person" style={styles.inputIcon}/>
                  <Input style={{textAlign: 'center', paddingRight: 20, paddingLeft: 50}}
                         autoCorrect={false}
                         placeholder="Tài khoản"
                         placeholderTextColor="#7481a7"
                         onChangeText={username => {this.setState({username});}}
                  />
                </Item>
                <Item style={styles.inputWrapper}>
                  <Icon name="unlock" style={styles.inputIcon}/>
                  <Input style={{textAlign: 'center', paddingRight: 20, paddingLeft: 50}}
                         placeholder="Mật khẩu"
                         placeholderTextColor="#7481a7"
                         secureTextEntry
                         onChangeText={password => this.setState({password})}
                  />
                </Item>
                <Text style={{
                  height: 30,
                  color: 'red',
                  marginBottom: (Platform.OS === 'ios') ? 10 : 0,
                  marginTop: (Platform.OS === 'ios') ? 10 : 0
                }}>
                  {this.state.errorMessage}
                </Text>
                {/*<Button transparent style={{*/}
                {/*alignSelf: 'flex-end',*/}
                {/*marginBottom: (Platform.OS === 'ios') ? 5 : 0,*/}
                {/*marginTop: (Platform.OS === 'ios') ? -10 : 0*/}
                {/*}}>*/}
                {/*<Text>*/}
                {/*Forgot Password*/}
                {/*</Text>*/}
                {/*</Button>*/}
                <Button rounded block style={styles.loginButton} onPress={ () => this.login() }>
                  <Text style={{color: '#ffffff'}}>
                    Login
                  </Text>
                </Button>


                <View style={styles.facebookWrapper}>
                  {/*<Button rounded block style={{marginBottom: 10}} >*/}
                  {/*</Button>*/}
                  <TouchableHighlight onPress={ () => this.loginFacebook() }>
                    <Image source={facebookButton} resizeMode='cover' style={styles.facebookButton}/>
                  </TouchableHighlight>
                  <Text onPress={ () => this.loginFacebook() } style={{color: '#405688'}}>
                    Đăng nhập qua Facebook
                  </Text>
                </View>
                {/*<Button transparent style={{alignSelf: 'center'}} onPress={() => Actions.signUp()}>*/}
                {/*<Text>*/}
                {/*Sign Up Here*/}
                {/*</Text>*/}
                {/*</Button>*/}
              </View>
            </View>
            {/*</View>*/}
          </Image>
        </Content>
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
  drawerState: state.drawer.drawerState,
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(Login);
