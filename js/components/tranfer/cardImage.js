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
  receice : "NHẬN QUÀ"
}

class FooterButton extends Component {
  changeFooterState() {
    const {target, dispatch} = this.props;
    dispatch(change_footer(target));
    switch (target){
      case "cashIn" : {
        Actions.cashIn();
        break;
      };
      case "tranfer" : {
        Actions.tranfer();
        break;
      };
      case "gift" : {
        Actions.gift();
        break;
      };
      case "receice" : {
        Actions.receive();
        break;
      };
      default:
        Actions.cashIn();
    }
  }

  render() {
    const {active} = this.props;
    if (active) {
      return (
        <Image source={item.image} key={index} resizeMode='cover' style={styles.cardImageActive}/> ;

    );
    } else {
      return (
        <TouchableHighlight onPress={ () => this.onSelectCard(item) }><Image source={item.image} key={index} resizeMode='cover' style={styles.cardImage}/></TouchableHighlight>
      );
    }

  }
}

export default FooterButton;
