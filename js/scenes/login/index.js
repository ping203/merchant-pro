import React, {Component} from 'react';
import {Image, Platform, AsyncStorage, TouchableHighlight} from 'react-native';
import {connect} from 'react-redux';
import {Actions, ActionConst} from 'react-native-router-flux';
import {Container, Content, Text, Item, Input, Button, Icon, View, Form, Spinner} from 'native-base';
import httpService from '../../common/http';
import {Facebook} from 'expo';
import {login_success,toggle_spin} from '../../actions/auth';
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
    if(!this.state.username.length || !this.state.username.length){
      _self.setError("Vui lòng nhập thông tin đăng nhập");
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

  handleLogin (response) {
    console.log("response",response);
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
      const {type, token} = await Facebook.logInWithReadPermissionsAsync('1847504665484148', {
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
    this.setState({username, errorMessage : ""});
  }

  setPassword(password) {
    this.setState({password, errorMessage : ""});
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
                  <Input style={{textAlign: 'center', paddingRight: 50, paddingLeft: 50}}
                         autoCorrect={false}
                         placeholder="Tài khoản"
                         placeholderTextColor="#7481a7"
                         onChangeText={username => {
                           this.setUsername(username);
                         }}
                  />
                </Item>
                <Item style={styles.inputWrapper}>
                  <Icon name="unlock" style={styles.inputIcon}/>
                  <Input style={{textAlign: 'center', paddingRight: 50, paddingLeft: 50}}
                         placeholder="Mật khẩu"
                         placeholderTextColor="#7481a7"
                         secureTextEntry
                         onChangeText={password => {
                           this.setPassword(password)
                         }}
                         onSubmitEditing={()=>this.login.call(this)}

                  />
                </Item>
                <Text style={styles.errorMessage}>
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
