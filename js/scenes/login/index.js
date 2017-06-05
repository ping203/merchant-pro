import React, {Component} from 'react';
import {Image, Platform, AsyncStorage, TouchableHighlight} from 'react-native';
import {connect} from 'react-redux';
import {Actions, ActionConst} from 'react-native-router-flux';
import {Container, Content, Text, Item, Input, Button, Icon, View, Form, Spinner} from 'native-base';
import httpService from '../../common/http';
import {Facebook} from 'expo';
import {login_success,toggle_spin} from '../../actions/auth';

import styles from './styles';


const backgroundImage = require('../../../images/glow2-old.png');
const logo = require('../../../images/logo.png');
const facebookButton = require('../../../images/facebook-button.png');


class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errorMessage: '',
      onExp: false
    };
  }

  componentDidMount() {
    this._loadInitialState.call(this);
  }

  _loadInitialState = async () => {
    var _self = this;
    try {
      _self.props.dispatch(toggle_spin(true));
      var value = await AsyncStorage.getItem("authData");
      if (value !== null) {
        var authData = JSON.parse(value);
        if (new Date().getTime() < authData.exp) {
          _self.props.dispatch(login_success(authData));
        }else{
          _self.props.dispatch(toggle_spin(false));
        }
      } else {
        _self.props.dispatch(toggle_spin(false));
      }
    } catch (error) {
      _self.setError('' + error.message);
    }
  };


  login() {
    var _self = this;
    _self.props.dispatch(toggle_spin(true));
    httpService.post("", {
      command: "login",
      type: "normal",
      username: this.state.username, //ndn199101
      password: this.state.password //ndn123456

    }).then(this.handleLogin.bind(this)).catch(function (thrown) {
      console.log('thrown.message login', thrown);
      _self.setError(thrown);
    });

  }

  handleLogin (response) {
    var _self = this;
    var data = response.data;
    if (data.status) {
      _self.setError(data.message);
    } else {
      _self.setError("");
      var accessToken = data.data && data.data.accessToken;
      if (accessToken) {
        try {
          _self.props.dispatch(login_success(data.data));
        } catch (error) {
          console.log("error", error);
          _self.setError(error);
        }
      }
    }
  }


  loginFacebook() {
    var _self = this;
    logIn();
    async function logIn() {
      const {type, token} = await Facebook.logInWithReadPermissionsAsync('1472518432772370', {
        permissions: ['public_profile'],
      });
      if (type === 'success') {
        _self.loginWidthToken(token);
      } else {
        _self.setError("Lỗi login !");
      }
    }
  }

  loginWidthToken(token) {
    var _self = this;
    httpService.post("", {
      command: "login",
      type: "facebook",
      accessToken: token
    }).then(this.handleLogin.bind(this)).catch(function (thrown) {
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
    const {showSpin} = this.props;
    return (
      <Container style={{backgroundColor: '#2a3146'}}>
          <Image source={backgroundImage} style={styles.container}>
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
                         onChangeText={username => {
                           this.setState({username});
                         }}
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

                {showSpin && <Spinner color="#999" />}
                {!showSpin && <Button rounded block style={styles.loginButton} onPress={ () => this.login() }>
                  <Text style={{color: '#ffffff'}}>
                    Login
                  </Text>
                </Button>}


                {!showSpin && <View style={styles.facebookWrapper}>
                  {/*<Button rounded block style={{marginBottom: 10}} >*/}
                  {/*</Button>*/}
                  <TouchableHighlight onPress={ () => this.loginFacebook() }>
                    <Image source={facebookButton} resizeMode='cover' style={styles.facebookButton}/>
                  </TouchableHighlight>
                  <Text onPress={ () => this.loginFacebook() } style={{color: '#405688'}}>
                    Đăng nhập qua Facebook
                  </Text>
                </View>}
                {/*<Button transparent style={{alignSelf: 'center'}} onPress={() => Actions.signUp()}>*/}
                {/*<Text>*/}
                {/*Sign Up Here*/}
                {/*</Text>*/}
                {/*</Button>*/}
              </View>
            </View>
          </Image>
      </Container>
    );
  }
}


function bindAction(dispatch) {
  return {
    closeDrawer: () => dispatch(closeDrawer()),
  };
}

const mapStateToProps = state => {
  const {showSpin} = state.auth;
  return {
    showSpin
  }
}

export default connect(mapStateToProps)(Login);
