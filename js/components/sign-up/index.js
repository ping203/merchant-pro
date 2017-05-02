

import React, { Component } from 'react';
import { Image } from 'react-native';
import { connect } from 'react-redux';
import { Container, Header, Title, Content, Button, Icon, Item, Input, View, Text, Left, Body, Right } from 'native-base';
import { Actions } from 'react-native-router-flux';

import styles from './styles';


const glow2 = require('../../../images/glow2.png');

class SignUp extends Component {


  render() {
    return (
      <Container style={{ backgroundColor: '#384850' }}>
        <Image source={glow2} style={styles.container} >
          <Header>
            <Left>
              <Button transparent onPress={() => Actions.pop()}>
                <Icon name="arrow-back" style={{ fontSize: 30, lineHeight: 32 }} />
              </Button>
            </Left>
            <Body>
              <Title>SignUp</Title>
            </Body>
            <Right />
          </Header>

          <Content padder style={{ backgroundColor: 'transparent' }}>
            <View padder>
              <View style={styles.mb25}>
                <Item underline>
                  <Icon active name="person" />
                  <Input
                    placeholder="Name"
                    placeholderTextColor="#FFF"
                  />
                </Item>
              </View>

              <View style={styles.mb25}>
                <Item underline>
                  <Icon name="mail-open" />
                  <Input
                    placeholder="Email"
                    placeholderTextColor="#FFF"
                  />
                </Item>
              </View>

              <View style={styles.mb25}>
                <Item underline>
                  <Icon name="unlock" />
                  <Input
                    placeholder="Password"
                    placeholderTextColor="#FFF"
                    secureTextEntry
                  />
                </Item>
              </View>

              <View style={styles.mb25}>
                <Item underline>
                  <Icon name="calendar" />
                  <Input
                    placeholder="Birthday"
                    placeholderTextColor="#FFF"
                  />
                </Item>
              </View>

              <View style={styles.mb25}>
                <Item underline>
                  <Icon active name="transgender" />
                  <Input
                    placeholder="Gender"
                    placeholderTextColor="#FFF"
                  />
                </Item>
              </View>

              <Button rounded block style={{ backgroundColor: '#fff', marginTop: 20 }} textStyle={{ color: '#00c497' }}>
                <Text style={{ color:'#00C497' }}>
                  Save and Continue
                </Text>
              </Button>
            </View>
          </Content>
        </Image>
      </Container>
    );
  }
}


export default connect()(SignUp);
