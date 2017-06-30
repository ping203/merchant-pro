import React, {Component} from 'react';
import {Image, Platform, AsyncStorage, TouchableHighlight, View, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import Communications from 'react-native-communications';

import {
  Container,
  Button,
  Icon,
  Text,
} from 'native-base';

import Modal from 'react-native-modalbox';
import styles from './styles';
import {openDrawer} from '../../actions/drawer';
import {open_confirm_popup, close_confirm_popup, update_message_config} from '../../actions/confirmPopup';
import SelectedCheckbox from './selectedCheckbox';
import httpService from '../../common/http';

const mappingNetwork  = {
  "vettel" : "vtt",
  vnp : "vnp",
  vms : "vms"
};


class ConfirmComponent extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.getMessageConfig().done();
  }

  onClosed() {
    this.props.dispatch(close_confirm_popup());
  }

  onOpened() {
    this.props.dispatch(open_confirm_popup());
  }

  getMessageConfig = async () => {
    var _self = this;
    httpService.post2("", {
      command: "get-verify-message"
    }).then(async function (response) {
      var data = response.data;
      if(data.status){
        _self.setError(data.message);
      }else{
        _self.props.dispatch(update_message_config(data.data));
      }
    }).catch(function (thrown) {
      console.log('thrown.getMessageConfig 2', thrown);
      _self.setError(thrown);
    });
  };

  setError(message) {
    this.setState(prevState => ({
      errorMessage: message
    }));
  }


  submit (phoneNumber, body)  {
    var _self = this;
    Communications.textWithoutEncoding(phoneNumber, body);
  };

  render() {
    const {openState, messageConfig, selectedNetwork} = this.props;
    let selectedMessage = "";

    for(var properties in messageConfig){
      if (mappingNetwork[properties] == selectedNetwork){
        selectedMessage = messageConfig[properties];
      }
    }
    return (
      <Modal
        style={[styles.modal, styles.modal2]}
        backdrop={true}
        ref={(c) => {
          this.modal = c;
        }}
        swipeToClose={false}
        isOpen={openState === "opened"}
        onOpened={this.onOpened.bind(this)}
        onClosed={this.onClosed.bind(this)}
      >
        <View  style={styles.header}>
          <Text style={{color : "#c4e1ff"}}>
            XÁC THỰC TÀI KHOẢN
          </Text>
          <Button
            transparent
            style={{position: 'absolute', top: 0, right: 0}}
            onPress={this.onClosed.bind(this)}
          >
            <Icon name="close" style={{color: '#c4e1ff'}}/>
          </Button>
        </View>
        <ScrollView style={styles.space}>
          <Text style={styles.descriptionText}>
            Xác thực tài khoản để sử dụng đầy đủ {"\n"}
            tính năng của game: Nhận quà, chuyển vàng ...{"\n"}
            Vui lòng chọn nhà mạng:
          </Text>
          <View style={styles.checkboxList}>
            <SelectedCheckbox network="vtt"></SelectedCheckbox>
            <SelectedCheckbox network="vnp"></SelectedCheckbox>
            <SelectedCheckbox network="vms"></SelectedCheckbox>
          </View>
          <View style={styles.buttonWrapper}>
            <Button rounded block style={styles.yellowButton} onPress={()=>this.submit(messageConfig.numberTo,selectedMessage)}>
              <Text style={styles.yellowButtonText}>
                Xác thực
              </Text>
            </Button>
          </View>
          <Text style={{color: '#1c6f91', textAlign : "center"}}>
            Hoặc soạn tin{"\n"}
          </Text>
          <View style={styles.messageContainer}>
            <Text numberOfLines={3} style={styles.messageContent}>
              <Text style={styles.messageYellow}>
                {selectedMessage}
              </Text>
              <Text style={styles.sendText}>
                {"\u0020"}gửi{"\u0020"}
              </Text>
              <Text style={styles.messageYellow}>
                {messageConfig.numberTo}
              </Text>
            </Text>
          </View>
        </ScrollView>
      </Modal>
    );
  }
}

function bindAction(dispatch) {
  return {
    // openConfirmPopup: () => dispatch(openDrawer()),
    onClosed: () => dispatch(close_confirm_popup()),
    onOpened: () => dispatch(open_confirm_popup()),
  };
}

const mapStateToProps = state => {
  const {openState, messageConfig, selectedNetwork} = state.confirmPopup;
  return {
    openState,
    messageConfig,
    selectedNetwork
  }
};

export default connect(mapStateToProps)(ConfirmComponent);
// export default connect(mapStateToProps, bindAction)(ConfirmComponent);
