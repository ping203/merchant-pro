import React, { Component } from 'react';
import { Image, Dimensions } from 'react-native';
import Messenger from 'react-native-gifted-messenger';
import { connect } from 'react-redux';
import { Container, Header, Title, Content, Button, Icon } from 'native-base';

import { openDrawer } from '../../actions/drawer';
import { Actions } from 'react-native-router-flux';
import styles from './styles';

const pratik = require('../../../images/contacts/pratik.png');
const sanket = require('../../../images/contacts/sanket.png');
const glow2 = require('../../../images/glow2.png');

class Chat extends Component {

  static propTypes = {
    openDrawer: React.PropTypes.func,
  }

  static getMessages() {
    return [
            { text: 'Hi... I am Pratik', name: 'Pratik', image: pratik, position: 'left', date: new Date(2015, 1, 3, 19, 0) },
            { text: 'Hello..... Sanket here...', name: 'Sanket', image: sanket, position: 'right', date: new Date(2015, 1, 3, 19, 0) },
    ];
  }
  static handleSend() {
  }

  handleReceive() {
    this._GiftedMessenger.appendMessage({
      text: 'Received message',
      name: 'Pratik',
      image: pratik,
      position: 'left',
      date: new Date(),
    });
  }


  render() {
    return (
      <Container theme={theme} style={{ backgroundColor: '#384850' }}>
        <Image source={glow2} style={styles.container} >
          <Header>
            <Button transparent onPress={() => Actions.pop()}>
              <Icon name="arrow-back" />
            </Button>

            <Title>Chat</Title>

            <Button transparent onPress={this.props.openDrawer}>
              <Icon active name="menu" />
            </Button>
          </Header>

          <Content padder style={{ backgroundColor: 'transparent' }}>
            <Messenger
              enableEmptySections
              ref={(c) => { this._Messenger = c; }}
              messages={this.getMessages()}
              handleSend={this.handleSend}
              maxHeight={Dimensions.get('window').height - 144}
              styles={{
                bubbleLeft: {
                  backgroundColor: '#e6e6eb',
                  marginRight: 70,
                },
                bubbleRight: {
                  backgroundColor: '#00c497',
                  marginLeft: 70,
                },
              }}
            />
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

export default connect(null, bindAction)(Chat);
