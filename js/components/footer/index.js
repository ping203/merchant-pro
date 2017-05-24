import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Icon, FooterTab, Button, Text} from 'native-base';

import {Actions, ActionConst} from 'react-native-router-flux';

import styles from './styles';
import FooterButton from './footerButton';

class Footer extends Component {


  changeFooterState(target){

  }

  render() {
    return (

      <FooterTab style={styles.footer}>
        <FooterButton target="cashIn"/>
        <FooterButton target="transfer" active/>
        <FooterButton target="cashOut"/>
        <FooterButton target="cashOutHistory"/>
      </FooterTab>

    );
  }
}

function bindAction(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
  };
}

const mapStateToProps = state => {
  return {
    footerState: state.footerState
  }
};

export default connect(mapStateToProps, bindAction)(Footer);
