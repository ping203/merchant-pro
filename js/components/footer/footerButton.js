import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Icon, FooterTab, Button, Text} from 'native-base';

import {Actions, ActionConst} from 'react-native-router-flux';
import {change_footer} from '../../actions/footerState';
import { NavigationActions } from 'react-navigation';

import styles from './styles';

const MappingTarget = {
  cashIn: "NẠP VÀNG",
  transfer: "CHUYỂN VÀNG",
  cashOut: "QUÀ TẶNG",
  cashOutHistory: "NHẬN QUÀ"
}

class FooterButton extends Component {
  changeFooterState() {
    const {target, dispatch} = this.props;
    dispatch(change_footer(target));

    dispatch(NavigationActions.navigate({
      routeName: "home" ,
      action: NavigationActions.navigate({ routeName: target})
    }));
  }

  render() {
    const {target, dispatch, footerState} = this.props;
    if (target === footerState) {
      return (
        <Button style={styles.activeButton}>
          < Text style={{color: "#a49ad3"}}> {MappingTarget[target]} </Text>
        </Button>
      );
    } else {
      return (
        <Button style={styles.button} onPress={this.changeFooterState.bind(this)}>
          < Text style={{color: "#676da6"}}> {MappingTarget[target]} </Text>
        </Button>
      );
    }

  }
}

const mapStateToProps = state => {
  return {
    footerState: state.footerState
  }
};

export default connect(mapStateToProps)(FooterButton);
