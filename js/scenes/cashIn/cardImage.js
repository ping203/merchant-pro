import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Icon, FooterTab, Button, Text} from 'native-base';

import {Actions, ActionConst} from 'react-native-router-flux';
import { change_footer } from '../../actions/footerState';

import styles from './styles';


class CardImageCashIn extends Component {

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

export default CardImageCashIn;
