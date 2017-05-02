import React, { Component } from 'react';
import { Image } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Title, Content, Text, Button, Icon, Right, Left, Body, Card, CardItem, View } from 'native-base';

import { openDrawer } from '../../actions/drawer';
import styles from './styles';


const glow2 = require('../../../images/glow2.png');

class Compose extends Component {

  static propTypes = {
    openDrawer: React.PropTypes.func,
  }


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
              <Title>Compose</Title>
            </Body>
            <Right>
              <Button transparent onPress={this.props.openDrawer}>
                <Icon active name="menu" style={{ fontSize: 30, lineHeight: 32 }} />
              </Button>
            </Right>
          </Header>

          <Content padder style={{ backgroundColor: 'transparent' }}>
            <Card foregroundColor="#000" style={styles.box}>
              <CardItem header style={styles.box}>
                <Text style={{ color: '#000' }}>Compose Mail</Text>
              </CardItem>

              <CardItem header >
                <Text style={{ color: '#000' }}>To : pratik@gmail.com</Text>
              </CardItem>

              <CardItem header>
                <Text style={{ color: '#000' }}>Subject: Enquiry about StrapMobile</Text>
              </CardItem>

              <CardItem>
                <Text style={{ color: '#000' }}>
                    I watched Leicester City lose in the 1969 FA Cup final with my dad when I was eight and cried all the way home. I have seen them
                    get promoted and relegated. I played for them for eight years. I even got a
                    group of like‑minded fans and friends to stump up a few quid to salvage the
                    club when they went into liquidation.
                  </Text>
              </CardItem>

              <CardItem header style={styles.box}>
                <Button
                  rounded
                  style={{ backgroundColor: '#00c497', paddingHorizontal: 15 }}
                  textStyle={{ color: '#fff' }}
                >
                  <Text>Send</Text>
                </Button>
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

export default connect(mapStateToProps, bindAction)(Compose);
