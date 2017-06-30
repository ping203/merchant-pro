import React, {Component} from 'react';
import {Image, Platform, AsyncStorage, TouchableHighlight} from 'react-native';
import {connect} from 'react-redux';
import {Actions, ActionConst} from 'react-native-router-flux';
import {Container, Content, Text, Item, Input, Button, Icon, View, Form, Spinner} from 'native-base';
import httpService from '../../common/http';
import {Facebook} from 'expo';
import {login_success, toggle_spin} from '../../actions/auth';
import {open_confirm_popup}  from '../../actions/confirmPopup';

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
      usernameRegister: '',
      passwordRegister: '',
      telephone: '',
      errorMessage: '',
      errorMessageRegister: '',
      onExp: false,
      isRegister: false
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
        } else {
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
    if (!this.state.username.length || !this.state.username.length) {
      _self.setError("Vui lòng nhập thông tin tài khoản");
      return;
    }
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

  async register() {
    var _self = this;
    if (!this.state.usernameRegister.length || !this.state.passwordRegister.length) {
      _self.setState(prevState => ({
        errorMessageRegister: "Vui lòng nhập thông tin tài khoản"
      }));
      return;
    }
    _self.props.dispatch(toggle_spin(true));
    var imei = await  this.getImei();
    httpService.post("", {
      command: "register",
      type: "normal",
      username: this.state.usernameRegister,
      password: this.state.passwordRegister,
      imei
    }).then(this.handleRegister.bind(this)).catch(function (thrown) {
      console.log('thrown.message register', thrown);
      _self.setState(prevState => ({
        errorMessageRegister: thrown
      }));
    });

  }

  handleRegister(response) {
    var _self = this;
    var data = response.data;
    if (data.status) {
      _self.props.dispatch(toggle_spin(false));
      _self.setState({errorMessageRegister: data.message});
    } else {
      const {usernameRegister, passwordRegister} = this.state;
      _self.setState({errorMessageRegister: "", username: usernameRegister, password: passwordRegister});
      _self.login.call(this);
    }
  }

  async getImei() {
    var imei = await AsyncStorage.getItem('imei');
    if (!imei) {
      imei = this.randomImei();
    }
    await AsyncStorage.setItem('imei', imei);
    return imei;
  }

  randomImei() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }

  handleLogin(response) {
    var _self = this;
    var data = response.data;
    if (data.status) {
      _self.props.dispatch(toggle_spin(false));
      _self.setError(data.message);
    } else {
      _self.setError("");
      try {
        _self.props.dispatch(login_success(data.data));
      } catch (error) {
        _self.setError(error);
        _self.props.dispatch(toggle_spin(false));
      }
    }
  }


  loginFacebook() {
    var _self = this;
    logIn();
    async function logIn() {
      const {type, token} = await Facebook.logInWithReadPermissionsAsync('347626685570220', {
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

  setUsername(username) {
    this.setState({username, errorMessage: ""});
  }

  setPassword(password) {
    this.setState({password, errorMessage: ""});
  }

  focusPassword() {
    console.log("this.refs.passwordInput", this.refs.passwordInput);
    // this.refs.passwordInput._root.focus();
  }

  render() {
    const {showSpin} = this.props;
    const {isRegister} = this.state;
    return (
      <Container style={{backgroundColor: '#165980'}}>
        <Image source={backgroundImage} style={styles.container}>
          <Content padder style={{backgroundColor: 'transparent'}}>
            <View style={styles.container}>
              <View style={styles.bg}>
                <Image source={logo} resizeMode='cover' style={styles.logo}/>
                {/*<Item underline style={{marginBottom: 20}}>*/}
                {!isRegister && <View style={styles.innerView}>

                  <Item style={styles.inputWrapper}>
                    {/*<Icon active name="person"/>*/}
                    <Icon active name="person" style={styles.inputIcon}/>
                    <Input  style={styles.loginInput}
                           autoCorrect={false}
                           placeholder="Tài khoản"
                           placeholderTextColor="#309dc5"
                           onChangeText={username => {
                             this.setUsername(username);
                           }}
                           onSubmitEditing={() => this.refs.passwordInput._root.focus()}
                    />
                  </Item>
                  <Item style={styles.inputWrapper}>
                    <Icon name="unlock" style={styles.inputIcon}/>
                    <Input  style={styles.loginInput}
                           placeholder="Mật khẩu"
                           placeholderTextColor="#309dc5"
                           secureTextEntry
                           onChangeText={password => {
                             this.setPassword(password)
                           }}
                           ref='passwordInput'
                           onSubmitEditing={() => this.login.call(this)}

                    />
                  </Item>
                  <Text style={styles.errorMessage}>
                    {this.state.errorMessage}
                  </Text>

                  {showSpin && <Spinner color="#999"/>}
                  {!showSpin && <Button rounded block style={styles.loginButton} onPress={ () => this.login() }>
                    <Text style={{color: '#835238'}}>
                      ĐĂNG NHẬP
                    </Text>
                  </Button>}

                  {!showSpin &&
                  <Text style={styles.loginText}
                        onPress={() => this.setState({isRegister: true, errorMessageRegister: ""})}>
                    ĐĂNG KÝ
                  </Text>}


                  {!showSpin && <View style={styles.facebookWrapper}>
                    {/*<Button rounded block style={{marginBottom: 10}} >*/}
                    {/*</Button>*/}
                    <TouchableHighlight onPress={ () => this.loginFacebook() }>
                      <Image source={facebookButton} resizeMode='cover' style={styles.facebookButton}/>
                    </TouchableHighlight>
                    <Text onPress={ () => this.loginFacebook() } style={{color: '#309dc5', marginTop: 10}}>
                      Đăng nhập qua Facebook
                    </Text>
                  </View>}
                </View>}
                {isRegister && <View style={styles.innerView}>

                  <Item style={styles.inputWrapper}>
                    <Icon active name="person" style={styles.inputIcon}/>
                    <Input  style={styles.loginInput}
                           autoCorrect={false}
                           placeholder="Tài khoản"
                           placeholderTextColor="#309dc5"
                           onChangeText={usernameRegister => {
                             this.setState({usernameRegister, errorMessageRegister: ""});
                           }}
                           onSubmitEditing={() => this.refs.passwordRegisterInput._root.focus()}
                    />
                  </Item>
                  <Item style={styles.inputWrapper}>
                    <Icon name="unlock" style={styles.inputIcon}/>
                    <Input style={styles.loginInput}
                           placeholder="Mật khẩu"
                           placeholderTextColor="#309dc5"
                           secureTextEntry
                           onChangeText={passwordRegister => {
                             this.setState({passwordRegister, errorMessageRegister: ""})
                           }}
                           ref='passwordRegisterInput'
                           onSubmitEditing={() => this.refs.telephoneInput._root.focus()}

                    />
                  </Item>
                  <Item style={styles.inputWrapper}>
                    <Icon name="md-phone-portrait" style={styles.inputIcon}/>
                    <Input style={styles.loginInput}
                           placeholder="Số điện thoại"
                           placeholderTextColor="#309dc5"
                           onChangeText={telephone => {
                             this.setState({telephone})
                           }}
                           ref='telephoneInput'
                           onSubmitEditing={() => this.register.call(this)}
                    />
                  </Item>
                  <Text style={styles.errorMessage}>
                    {this.state.errorMessageRegister}
                  </Text>

                  {showSpin && <Spinner color="#999"/>}
                  {!showSpin && <Button rounded block style={styles.loginButton} onPress={ () => this.register() }>
                    <Text style={{color: '#835238'}}>
                      ĐĂNG KÝ
                    </Text>
                  </Button>}

                  {!showSpin &&
                  <Text style={styles.loginText} onPress={() => this.setState({isRegister: false, errorMessage: ""})}>
                    ĐĂNG NHẬP
                  </Text>}


                  {!showSpin && <View style={styles.facebookWrapper}>
                    {/*<Button rounded block style={{marginBottom: 10}} >*/}
                    {/*</Button>*/}
                    <TouchableHighlight onPress={ () => this.loginFacebook() }>
                      <Image source={facebookButton} resizeMode='cover' style={styles.facebookButton}/>
                    </TouchableHighlight>
                    <Text onPress={ () => this.loginFacebook() } style={{color: '#309dc5', marginTop: 10}}>
                      Đăng nhập qua Facebook
                    </Text>
                  </View>}
                </View>}
              </View>
            </View>
          </Content>
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
