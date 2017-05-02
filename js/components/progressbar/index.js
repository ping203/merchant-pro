
import React, { Component } from 'react';
import { Image } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Title, Content, Text, Button, Icon, Card, CardItem, Left, Body, Right } from 'native-base';

import { openDrawer } from '../../actions/drawer';


import styles from './styles';
import ProgressBar from './../loaders/ProgressBar';


const glow2 = require('../../../images/glow2.png');

class ProgressBarNSP extends Component {

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
              <Title>ProgressBar</Title>
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
                <Text style={{ color: '#000' }}>Default ProgressBar</Text>
              </CardItem>
              <CardItem style={{ paddingVertical: 30 }}>
                <ProgressBar color="red" progress={25} />
              </CardItem>
              <CardItem header>
                <Text style={{ color: '#000' }}>Inverse ProgressBar</Text>
              </CardItem>
              <CardItem style={{ paddingVertical: 30 }}>
                <ProgressBar inverse progress={76} />
              </CardItem>
              <CardItem header>
                <Text style={{ color: '#000' }}>Custom ProgressBar</Text>
              </CardItem>
              <CardItem style={{ paddingVertical: 30 }}>
                <ProgressBar color="#66FB67" progress={39} />
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

export default connect(mapStateToProps, bindAction)(ProgressBarNSP);
