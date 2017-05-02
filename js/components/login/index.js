
import React, { Component } from 'react';
import { Image, Platform } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Container, Content, Text, Item, Input, Button, Icon, View, Form } from 'native-base';

import styles from './styles';


const backgroundImage = require('../../../images/glow2.png');
const logo = require('../../../images/logo.png');

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      scroll: false,
    };
  }


  render() {
    return (
      <Container>

        <Content style={{ backgroundColor: '#384850' }} >
          <Image source={backgroundImage} style={styles.container}>
            <Image source={logo} style={styles.shadow}>
              <View style={styles.bg}>
                    <Item underline style={{ marginBottom: 20 }}>
                      <Icon active name="person" />
                      <Input
                        autoCorrect={false}
                        placeholder="Email"
                        placeholderTextColor="#FFF"
                        onChangeText={email => this.setState({ email })}
                      />
                    </Item>
                    <Item underline style={{ marginBottom: 30 }}>
                      <Icon name="unlock" />
                      <Input
                        placeholder="Password"
                        placeholderTextColor="#FFF"
                        secureTextEntry
                        onChangeText={password => this.setState({ password })}
                      />
                    </Item>
                <Button transparent style={{ alignSelf: 'flex-end', marginBottom: (Platform.OS === 'ios') ? 5 : 0, marginTop: (Platform.OS === 'ios') ? -10 : 0 }}>
                  <Text>
                    Forgot Password
                  </Text>
                </Button>
                <Button rounded block style={{ marginBottom: 10 }} onPress={() => Actions.home()}>
                  <Text style={{ color:'#00C497' }}>
                    Login
                  </Text>
                </Button>
                <Button transparent style={{ alignSelf: 'center' }} onPress={() => Actions.signUp()}>
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
