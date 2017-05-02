
import React, { Component } from 'react';
import { Image, View } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Modal from 'react-native-modalbox';
import { Container, Header, Title, Content, Text, Right, Left, Body, Button, Icon } from 'native-base';

import { openDrawer } from '../../actions/drawer';
import styles from './styles';


const glow2 = require('../../../images/glow2.png');

class Modal1 extends Component {

  static propTypes = {
    openDrawer: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isDisabled: false,
      swipeToClose: true,
    };
  }


  openModal1() {
    this.modal1.open();
  }
  closeModal1() {
    this.modal1.close();
  }
  openModal2() {
    this.modal2.open();
  }
  closeModal2() {
    this.modal2.close();
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
              <Title>Modal</Title>
            </Body>
            <Right>
              <Button transparent onPress={this.props.openDrawer}>
                <Icon active name="menu" style={{ fontSize: 30, lineHeight: 32 }} />
              </Button>
            </Right>
          </Header>

          <Content style={{ backgroundColor: 'transparent' }}>
            <View style={styles.box}>
              <View style={styles.space}>
                <Button
                  block
                  rounded
                  style={{ backgroundColor: '#00c497' }}
                  textStyle={{ color: '#fff' }}
                  onPress={() => this.openModal1()}
                >
                  <Text>Basic Modal</Text>
                </Button>
              </View>
              <View style={styles.space}>
                <Button
                  block
                  rounded
                  style={{ backgroundColor: '#00c497' }}
                  textStyle={{ color: '#fff' }}
                  onPress={() => this.openModal2()}
                >
                  <Text>Custom Modal</Text>
                </Button>
              </View>
            </View>

            <Modal
              style={[styles.modal, styles.modal1]}
              backdrop={false}
              ref={(c) => { this.modal1 = c; }}
              swipeToClose={this.state.swipeToClose}
            >
              <View style={styles.space}>
                <Text style={{ color: '#000', marginBottom: 10 }}>Basic modal</Text>
                <Button
                  rounded
                  style={{ backgroundColor: '#00c497' }}
                  textStyle={{ color: '#fff' }}
                  onPress={() => this.closeModal1()}
                >
                  <Text>Close Modal</Text>
                </Button>
              </View>
            </Modal>

            <Modal
              style={[styles.modal, styles.modal2]}
              backdrop={false}
              ref={(c) => { this.modal2 = c; }}
              swipeToClose={false}
            >
              <Button
                transparent
                style={{ position: 'absolute', top: 0, right: 0 }}
                onPress={() => this.closeModal2()}
              >
                <Icon name="close" style={{ color: '#000' }} />
              </Button>
              <View style={styles.space}>
                <Text style={{ color: '#000' }}>
                    This is a full screen modal.
                </Text>
              </View>
            </Modal>
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

export default connect(mapStateToProps, bindAction)(Modal1);
