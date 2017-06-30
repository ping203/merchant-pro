import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Text, CheckBox, Radio} from 'native-base';
import {View} from 'react-native';
import {confirm_popup_select_network} from '../../actions/confirmPopup';
import styles from './styles';

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
    const {network, selectedNetwork, dispatch} = this.props;
    if (network === selectedNetwork) {
      return (
        <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
          <Radio selected={true} onPress={this.onSelect.bind(this)} radioColor="#86b4ff" color="#1c6f91"/>
          <Text  onPress={this.onSelect.bind(this)}  style={{color: "#1c6f91", paddingLeft : 5}}>{MappingTarget[network]}</Text>
        </View>
      );
    } else {
      return (
        <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
          <Radio selected={false} onPress={this.onSelect.bind(this)} radioColor="#1c6f91" backgroundColor="#1c6f91"/>
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
