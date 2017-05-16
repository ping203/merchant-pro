import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Icon, FooterTab, Button, Text} from 'native-base';

import {Actions, ActionConst} from 'react-native-router-flux';
import { change_footer } from '../../actions/footerState';

import styles from './styles';

const MappingTarget = {
  cashIn : "NẠP VÀNG",
  tranfer : "CHUYỂN VÀNG",
  gift : "QUÀ TẶNG",
  reveice : "NHẬN QUÀ"
}

class FooterButton extends Component {
  changeFooterState() {
    const {target, dispatch} = this.props;
    dispatch(change_footer(target));
    switch (target){
      case "cashIn" : {
        Actions.cashIn()
        break;
      };
      case "tranfer" : {
        console.log("contacts");
        Actions.contacts()
        break;
      };
      case "gift" : {
        Actions.gift()
        break;
      };
      case "reveice" : {
        Actions.reveice()
        break;
      };
      default:
        Actions.cashIn();
    }
  }

  render() {
    const {target, dispatch, footerState} = this.props;
    if (target === footerState) {
      return (
        <Button >
            < Text style={{color: "red"}}> {MappingTarget[target]} </Text>
        </Button>
      );
    } else {
      return (
        <Button onPress={this.changeFooterState.bind(this)}>
          < Text style={{color: "green"}}> {MappingTarget[target]} </Text>
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
