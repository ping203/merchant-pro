import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Text, CheckBox, Radio, Icon} from 'native-base';
import {View} from 'react-native';
import {confirm_popup_select_network} from '../../actions/confirmPopup';
import styles from './styles';
import theme from '../../themes/base-theme';

const MappingTarget = {
  vtt: "Viettel",
  vnp: "Vinaphone",
  vms: "Mobiphone"
}

class SelectedCheckbox extends Component {

  constructor(props) {
    super(props);
  }

  onSelect() {
    this.props.dispatch(confirm_popup_select_network(this.props.network));
  }

  render() {
    const {network, selectedNetwork, dispatch, style} = this.props;
    var styleWrap = Object.assign({flexDirection: "row", justifyContent: "center", alignItems: "center"}, style)
    if (network === selectedNetwork) {
      return (
        <View style={styleWrap}>
          <Icon name="md-radio-button-on" onPress={this.onSelect.bind(this)}  style={{ color : "#1c6f91"}}/>
          <Text  onPress={this.onSelect.bind(this)}  style={{color: "#1c6f91", paddingLeft : 5}}>{MappingTarget[network]}</Text>
        </View>
      );
    } else {
      return (
        <View style={styleWrap}>
          <Icon name="md-radio-button-off" onPress={this.onSelect.bind(this)}  style={{ color : "#1c6f91"}}/>
          <Text  onPress={this.onSelect.bind(this)}  style={{color: "#1c6f91", paddingLeft : 5}}>{MappingTarget[network]}</Text>
        </View>
      );
    }

  }
}

function bindAction(dispatch) {
  return {
    // selectCheckbox: () => dispatch(confirm_popup_select_network(network)),
  };
}

const mapStateToProps = state => {
  return {
    selectedNetwork: state.confirmPopup.selectedNetwork
  }
};

export default connect(mapStateToProps)(SelectedCheckbox);
