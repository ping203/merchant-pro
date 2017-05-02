
import React, { Component } from 'react';
import { Image } from 'react-native';
import { connect } from 'react-redux';
import { Actions, ActionConst } from 'react-native-router-flux';
import { Container, Header, Title, Content, Button, Icon, List, ListItem, Text, Footer, Left, Right, Body } from 'native-base';

import { openDrawer } from '../../actions/drawer';
import FooterComponent from './../footer';
import styles from './styles';


const glow2 = require('../../../images/glow2.png');

class Home extends Component {  //eslint-disable-line

  static propTypes = {
    openDrawer: React.PropTypes.func,
  }

  render() {
    return (
      <Container style={{ backgroundColor: '#384850' }}>
        <Image source={glow2} style={styles.container} >

          <Header >
            <Left />
            <Body>
              <Title>Home</Title>
            </Body>
            <Right>
              <Button transparent onPress={this.props.openDrawer} >
                <Icon active name="menu" style={{ fontSize: 30, lineHeight: 32 }} />
              </Button>
            </Right>
          </Header>

          <Content padder style={{ backgroundColor: 'transparent' }}>

            <ListItem icon style={styles.listitem} >
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
            <ListItem icon style={styles.listitem}>
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
            <ListItem icon style={styles.listitem}>
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
            <ListItem icon style={styles.listitem}>
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
            <Button
              style={styles.roundedButton}
              onPress={() => Actions.login({ type: ActionConst.RESET })}
            >
              <Icon active name="close" style={styles.closeIcon} />
            </Button>
          </Content>

          <Footer style={{ borderTopWidth: 0, backgroundColor: 'transparent' }}>
            <FooterComponent navigator={this.props.navigation} />
          </Footer>
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

export default connect(mapStateToProps, bindAction)(Home);
