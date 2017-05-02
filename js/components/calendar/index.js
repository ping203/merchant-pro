import React, { Component } from 'react';
import { Image } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Title, Content, Text, Button, Right, Left, Body, Icon, Footer } from 'native-base';

import { openDrawer } from '../../actions/drawer';


import FooterComponent from './../footer';
import styles from './styles';

const CalendarPicker = require('react-native-calendar-picker');

const glow2 = require('../../../images/glow2.png');


class Calendar extends Component {

  static propTypes = {
    openDrawer: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
    };
  }

  onDateChange(date) {
    this.setState({ date });
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
              <Title>Calendar</Title>
            </Body>
            <Right>
              <Button transparent onPress={this.props.openDrawer}>
                <Icon active name="menu" style={{ fontSize: 30, lineHeight: 32 }} />
              </Button>
            </Right>
          </Header>

          <Content padder style={{ backgroundColor: 'transparent' }} >
            <CalendarPicker
              selectedDate={this.state.date}
              onDateChange={e => this.onDateChange(e)}
              textStyle={{ color: '#fff' }}
              selectedDayColor="#00c497"
            />

            <Text style={{ marginTop: 5, alignSelf: 'center', color: '#ffffff' }} >
              Date: { this.state.date.toString().substr(4, 12) }
            </Text>
          </Content>

          <Footer style={{ borderTopWidth: 0 }}>
            <FooterComponent />
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

export default connect(mapStateToProps, bindAction)(Calendar);
