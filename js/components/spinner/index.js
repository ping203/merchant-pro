
import React, { Component } from 'react';
import { Image } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Title, Content, Text, Spinner, Button, Icon, ListItem, Left, Right, Body, Card, CardItem } from 'native-base';

import { openDrawer } from '../../actions/drawer';
import styles from './styles';


const glow2 = require('../../../images/glow2.png');

class SpinnerNSP extends Component {

  static propTypes = {
    openDrawer: React.PropTypes.func,
  }

  render() {
    return (
      <Container style={{ backgroundColor: '#384850' }} >
        <Image source={glow2} style={styles.container} >

          <Header>
            <Left>
              <Button transparent onPress={() => Actions.pop()}>
                <Icon name="arrow-back" style={{ fontSize: 30, lineHeight: 32 }} />
              </Button>
            </Left>
            <Body>
              <Title>Spinner</Title>
            </Body>
            <Right>
              <Button transparent onPress={this.props.openDrawer}>
                <Icon active name="menu" style={{ fontSize: 30, lineHeight: 32 }} />
              </Button>
            </Right>
          </Header>
          <Content padder style={{ backgroundColor: 'transparent' }} >
            <Card transparent foregroundColor="#000">
              <CardItem header>
                <Text style={{ color: '#000' }}>Default Spinner</Text>
              </CardItem>
              <CardItem style={styles.padding}>
                <Left />
                <Body>
                  <ListItem style={{ borderBottomWidth: 0 }}>
                    <Spinner />
                  </ListItem>
                </Body>
                <Right />
              </CardItem>
              <CardItem header>
                <Text style={{ color: '#000' }}>Inverse Spinner</Text>
              </CardItem>
              <CardItem style={styles.padding}>
                <Left />
                <Body>
                  <ListItem style={{ borderBottomWidth: 0 }}>

                    <Spinner inverse />

                  </ListItem>
                </Body>
                <Right />
              </CardItem>
              <CardItem header>
                <Text style={{ color: '#000' }}>Custom Spinner</Text>
              </CardItem>
              <CardItem style={styles.padding}>
                <Left />
                <Body>
                  <ListItem style={{ borderBottomWidth: 0 }}>

                    <Spinner color="#ff00a8" />

                  </ListItem>
                </Body>
                <Right />
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


export default connect(null,bindAction)(SpinnerNSP);
