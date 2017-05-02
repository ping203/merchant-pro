
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon, FooterTab, Button } from 'native-base';

import { Actions, ActionConst } from 'react-native-router-flux';

import styles from './styles';

class Footer extends Component {


  render() {
    return (


      <FooterTab style={styles.footer}>
        <Button onPress={() => Actions.calendar()}>
          <Icon name="calendar" />
        </Button>
        <Button onPress={() => Actions.form()}>
          <Icon name="pie" />
        </Button>
        <Button>
          <Icon name="add-circle" />
        </Button>
        <Button onPress={() => Actions.contacts()}>
          <Icon active name="person" />
        </Button>
        <Button onPress={() => Actions.spinners()}>
          <Icon name="time" />
        </Button>
      </FooterTab>


    );
  }
}


export default connect()(Footer);
