import React, { Component } from 'react';
import { Image } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Title, Content, Text, Button, Icon, Left, Right, Body, ListItem } from 'native-base';

import { openDrawer } from '../../actions/drawer';
import styles from './styles';


const glow2 = require('../../../images/glow2.png');

class Lists extends Component {

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
                <Icon name="ios-arrow-back" style={{ fontSize: 30, lineHeight: 32 }} />
              </Button>
            </Left>
            <Body>
              <Title>List</Title>
            </Body>
            <Right>
              <Button transparent onPress={this.props.openDrawer}>
                <Icon name="ios-menu" style={{ fontSize: 30, lineHeight: 32 }} />
              </Button>
            </Right>
          </Header>

          <Content style={{ backgroundColor: 'transparent' }}>
            <ListItem icon>
              <Left>
                <Icon active name="people" style={{ width: 30 }} />
              </Left>
              <Body>
                <Text >Daily Stand Up</Text>
              </Body>
              <Right>
                <Text style={{ fontWeight: '400', paddingTop: 18 }} note>10:00 AM</Text>
              </Right>
            </ListItem>
            <ListItem icon >
              <Left>
                <Icon active name="flag" style={{ width: 30 }} />
              </Left>
              <Body>
                <Text>Finish list Screen</Text>
              </Body>
              <Right>
                <Text style={{ fontWeight: '400', paddingTop: 18 }} note>By 2:00 PM</Text>
              </Right>
            </ListItem>
            <ListItem icon>
              <Left>
                <Icon active name="restaurant" style={{ width: 30 }} />
              </Left>
              <Body>
                <Text>Lunch Break</Text>
              </Body>
              <Right>
                <Text style={{ fontWeight: '400', paddingTop: 18 }} note>2:00 PM</Text>
              </Right>
            </ListItem>
            <ListItem icon >
              <Left>
                <Icon active name="megaphone" style={{ width: 30 }} />
              </Left>
              <Body>
                <Text>Discussion With Client</Text>
              </Body>
              <Right>
                <Text style={{ fontWeight: '400', paddingTop: 18 }} note>8:00 AM</Text>
              </Right>
            </ListItem>
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

export default connect(mapStateToProps, bindAction)(Lists);
