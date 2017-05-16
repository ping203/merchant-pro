import React, { Component } from 'react';
import { Image, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Title, Button, Icon, Tabs, Tab, Left, Right, Body } from 'native-base';

import { openDrawer } from '../../actions/drawer';

import AllContacts from './allContacts';
import Favourites from './favourites';
import Recent from './recent';
import styles from './styles';


const glow2 = require('../../../images/glow2.png');

class Contacts extends Component {

  static propTypes = {
    openDrawer: React.PropTypes.func,
  }


  render() {
    return (
      <Container style={{ backgroundColor: '#384850' }}>
        <Image source={glow2} style={styles.container} >

          <Header hasTabs style={{ elevation: 0 }}>
            <Left>
              <Button transparent onPress={() => Actions.pop()}>
                <Icon name="arrow-back" style={{ fontSize: 30, lineHeight: 32 }} />
              </Button>
            </Left>
            <Body>
              <Title>Contacts</Title>
            </Body>
            <Right>
              <Button transparent onPress={this.props.openDrawer}>
                <Icon active name="menu" style={{ fontSize: 30, lineHeight: 32 }} />
              </Button>
            </Right>
          </Header>
          <Tabs>
            <Tab heading="All1">
              <AllContacts />
            </Tab>
            <Tab heading="Favourite">
              <Favourites />
            </Tab>
            <Tab heading="Recent">
              <Recent />
            </Tab>
            <Tab heading="Recent2">
              <Recent />
            </Tab>
          </Tabs>
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

export default connect(mapStateToProps, bindAction)(Contacts);
