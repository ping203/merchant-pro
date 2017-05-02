
import React, { Component } from 'react';
import { Image, Platform } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Title, Content, Text, Button, Icon, List, ListItem, Card, CardItem, Label, Item, Input, Left, Right, Body } from 'native-base';

import { openDrawer } from '../../actions/drawer';
import styles from './styles';

const glow2 = require('../../../images/glow2.png');

class Form extends Component {

  static propTypes = {
    openDrawer: React.PropTypes.func,
  }


  render() {
    return (
      <Container  style={{ backgroundColor: '#384850' }} >
        <Image source={glow2} style={styles.container} >

          <Header>
            <Left>
              <Button transparent onPress={() => Actions.pop()}>
                <Icon name="arrow-back" style={{ fontSize: 30, lineHeight: 32 }} />
              </Button>
            </Left>
            <Body>
              <Title>Form</Title>
            </Body>
            <Right>
              <Button transparent onPress={this.props.openDrawer}>
                <Icon active name="menu" style={{ fontSize: 30, lineHeight: 32 }} />
              </Button>
            </Right>
          </Header>

          <Content padder style={{ backgroundColor: 'transparent' }} >
            <Card transparent foregroundColor="#000" style={ styles.card }>
              <CardItem header >
                <Text style={{ color: '#000' }}>Input with icon</Text>
              </CardItem>
              <CardItem>
                <Item style={{ borderColor: '#d5d5d5' }}>
                  <Icon  active name="person" style={{ color: '#000' }} />
                  <Input placeholder="Email" placeholderTextColor="#878787" style={{ color: '#000' }} />
                </Item>
              </CardItem>
              <CardItem header>
                <Text style={{ color: '#000' }}>Input</Text>
              </CardItem>
              <CardItem>
                <Item style={{ borderColor: '#d5d5d5' }}>
                  <Input placeholder="Name" placeholderTextColor="#878787" style={{ color: '#000', marginLeft: (Platform.OS === 'ios') ? undefined : -3, }} />
                </Item>
              </CardItem>
              <CardItem header>
                <Text style={{ color: '#000' }}>Input with floating label</Text>
              </CardItem>
              <CardItem>
                <Item  floatingLabel>
                  <Label>Username</Label>
                  <Input style={{ color: '#000', marginLeft: (Platform.OS === 'ios') ? undefined : -3, }} />
                </Item>
              </CardItem>
              <CardItem header>
                <Text style={{ color: '#000' }}>Input with inline label</Text>
              </CardItem>
              <CardItem >
                <Item inlineLabel>
                  <Label>ALIAS</Label>
                  <Input placeholder="John Doe" style={{ color: '#000', top: (Platform.OS === 'ios') ? undefined : 1 }} />
                </Item>
              </CardItem>
              <CardItem header>
                <Text style={{ color: '#000' }}>Input with stacked label</Text>
              </CardItem>
              <CardItem>
                <Item stackedLabel>
                  <Label>Address Line 1</Label>
                  <Input placeholder="Address" style={{ color: '#000', marginLeft: (Platform.OS === 'ios') ? undefined : -3 }} />
                </Item>
              </CardItem>
              <CardItem header>
                <Text style={{ color: '#000' }}>Input with Fixed label</Text>
              </CardItem>
              <CardItem>
                <Item fixedLabel style={{ borderColor: '#d5d5d5' }}>
                  <Label>Username</Label>
                  <Input  style={{ color: '#000' }} />
                </Item>
              </CardItem>
            </Card>
          </Content>
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

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, bindAction)(Form);
