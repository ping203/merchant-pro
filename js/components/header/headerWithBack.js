import React, {Component} from 'react';
import {Image, View} from 'react-native';
import {connect} from 'react-redux';
import { NavigationActions } from 'react-navigation'
import {
  Button,
  Icon,
  Text
} from 'native-base';
import styles from './styles';


const headerBg = require('../../../images/layout/header-bg.png');

class HeaderWithBackComponent extends Component {

  back(){
    this.props.dispatch(NavigationActions.back());
  };

  render() {

    const {tittle} = this.props;

    return (
      <Image source={headerBg} style={styles.headerContainer}>

        <View style={styles.headerInner}>

          <Button  style={styles.headerBackButton} transparent onPress={()=>this.back.call(this)}>
            <Icon active name="md-arrow-dropleft-circle" style={{fontSize: 40, color : "#4fbde1"}}/>
          </Button>

          < Text style={styles.headerBackTitle}>
            {tittle}
          </Text>
        </View>
      </Image>


    );
  }
}

const mapStateToProps = state => {
  return {}
};

export default connect(mapStateToProps)(HeaderWithBackComponent);
