import React, {Component} from 'react';
import {Image, Platform} from 'react-native';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {Container, Content, Text, Item, Input, Button, Icon, View, Form} from 'native-base';
import axios from 'axios';
import httpService from '../../common/http';
import {Facebook} from 'expo';

import styles from './styles';


const backgroundImage = require('../../../images/glow2.png');
const logo = require('../../../images/logo-new.png');


class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      scroll: false,
      errorMessage: ''
    };
  }


  login() {
    var _self = this;
    console.log("this", this.setError, _self.setError);
    httpService.post("",{
      command : "login",
      type : "normal",
      username : this.state.username, //ndn199101
      password : this.state.password //ndn123456

    }).then(function (response) {
        var data = response.data;
        if(data.status){
          console.log("data",data);
          _self.setError(data.message);
        }else{
          _self.setError("");
          Actions.home();
        }
        console.log(response.data);
      }).catch(function (thrown) {
        console.log('thrown.message2',thrown);
        _self.setError(thrown);
    });

  }

  loginFacebook() {
    var _self = this;
    logIn();
    async function logIn() {
      const { type, token } = await Facebook.logInWithReadPermissionsAsync('1472518432772370', {
        permissions: ['public_profile'],
      });
      if (type === 'success') {
        console.log("type, token",type, token);
        _self.loginWidthToken(token);
        // const response = await fetch(
        //   `https://graph.facebook.com/me?access_token=${token}`);
        // Alert.alert(
        //   'Logged in!',
        //   `Hi ${(await response.json()).name}!`,
        // );
      }else{
        console.log("hihii");
      }
    }
  }

  loginWidthToken(token) {
    var _self = this;
    console.log("this", this.setError, _self.setError);
    httpService.post("",{
      command : "login",
      type : "facebook",
      accessToken : token
    }).then(function (response) {
      var data = response.data;
      if(data.status){
        console.log("data",data);
        _self.setError(data.message);
      }else{
        _self.setError("");
        Actions.home();
      }
      console.log(response.data);
    }).catch(function (thrown) {
      console.log('thrown.message2',thrown);
      _self.setError(thrown);
    });
  }


  setError(message){
    this.setState(prevState => ({
      errorMessage: message
    }));
  }

  render() {
    return (
      <Container>

        <Content style={{backgroundColor: '#384850'}}>
          <Image source={backgroundImage} style={styles.container}>
            <Image source={logo} style={styles.shadow}>
              <View style={styles.bg}>
                <Item underline style={{marginBottom: 20}}>
                  <Icon active name="person"/>
                  <Input
                    autoCorrect={false}
                    placeholder="Username"
                    placeholderTextColor="#FFF"
                    onChangeText={username => this.setState({username})}
                  />
                </Item>
                <Item underline style={{marginBottom: 30}}>
                  <Icon name="unlock"/>
                  <Input
                    placeholder="Password"
                    placeholderTextColor="#FFF"
                    secureTextEntry
                    onChangeText={password => this.setState({password})}
                  />
                </Item>
                <Text style={{
                  color: 'red',
                  marginBottom: (Platform.OS === 'ios') ? 5 : 0,
                  marginTop: (Platform.OS === 'ios') ? -10 : 0
                }}>
                  {this.state.errorMessage}
                </Text>
                <Button transparent style={{
                  alignSelf: 'flex-end',
                  marginBottom: (Platform.OS === 'ios') ? 5 : 0,
                  marginTop: (Platform.OS === 'ios') ? -10 : 0
                }}>
                  <Text>
                    Forgot Password
                  </Text>
                </Button>
                <Button rounded block style={{marginBottom: 10}} onPress={ () => this.login() }>
                  <Text style={{color: '#00C497'}}>
                    Login
                  </Text>
                </Button>

                <Button rounded block style={{marginBottom: 10}} onPress={ () => this.loginFacebook() }>
                  <Text style={{color: '#00C497'}}>
                    Login Facebook
                  </Text>
                </Button>
                <Button transparent style={{alignSelf: 'center'}} onPress={() => Actions.signUp()}>
                    <Text>
                    Sign Up Here
                  </Text>
                </Button>
              </View>
            </Image>
          </Image>
        </Content>
      </Container>
    );
  }
}

export default connect()(Login);
