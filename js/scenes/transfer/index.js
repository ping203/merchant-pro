import React, {Component} from 'react';
import {Image, Platform, AsyncStorage, TouchableHighlight, View, Alert, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {Actions, ActionConst} from 'react-native-router-flux';
import httpService from '../../common/http';
import {
  Container,
  Content,
  Button,
  Icon,
  Text,
  Radio,
  Item,
  Input
} from 'native-base';

import {openDrawer} from '../../actions/drawer';
import HeaderComponent from '../../components/header/index';
import styles from './styles';
import styles2 from '../login/styles';
import modalStyle from '../../components/styles/modal';
import {logout, update_gold} from '../../actions/auth';
import {select_free_type, change_receiver, change_value, update_config_ratio, toggle_tutorial, go_history} from './actions';
import {refreshHistory} from '../historyTransfer/actions';
import Modal from 'react-native-modalbox';
import axios, {CancelToken}from 'axios';
import NumberFormater from '../../components/numberFormatter';


const glow2 = require('../../../images/glow2-new.png');


class TransferComponent extends Component {  //eslint-disable-line

  static propTypes = {
    openDrawer: React.PropTypes.func,
  }

  static navigationOptions = ({ navigation }) => ({
    // title: `CHUYỂN VÀNG`,
  });

  constructor(props) {
    super(props);
    this.state = {
      serial: '',
      code: '',
      errorMessage: '',
      onExp: false,
      configGold: [{
        gold: "20000",
        price: "20000",
        currency: "VND"
      }],
      selectedCard: {
        name: "Mobifone",
        code: "vtt"
      }
    };
  }

  componentDidMount() {
    this.getTransferConfig().done();
  }

  getTransferConfig = async () => {
    var _self = this;
    httpService.post2("", {
      command: "fetch_transfer_config",
      cashInType: 1

    }).then(async function (response) {
      var data = response.data.data;
      if (data) {
        _self.props.dispatch(update_config_ratio(data.fee));
      }
    }).catch(function (thrown) {
      console.log('thrown.message 4', thrown);
      _self.setError(thrown);
    });
  };

  submit() {
    var _self = this;
    const {feeType, receiver, value} = this.props;
    if(!this.isVerifyReceiver){
      _self.setError("Username không đúng");
      return;
    }
    httpService.post2("", {
      command: "transfer_gold",
      value,
      toUsername : receiver,
      feeOnSender : feeType == "sender"
    }).then(async function (response) {
      var data = response.data;
      if(typeof data.status == 'undefined'){
        _self.setError("Server error");
      }else      if (data.status) {
        _self.setError(data.message);
      } else {
        _self.setError("");
        _self.props.dispatch(update_gold(data.money));
        Alert.alert(
          'Thông báo',
          data.message,
          [
            {text: 'OK', onPress: () => _self.clearState()},
          ],
          {cancelable: true}
        )
      }
    }).catch(function (thrown) {
      console.log('thrown submit cast in', thrown);
      _self.setError(thrown);
    });
  };


  clearState() {
    this.isVerifyReceiver = false;
    this.props.dispatch(change_value("0"));
    this.props.dispatch(change_receiver(""));
    this.props.dispatch(refreshHistory());
    this.setError("");
  }


  setError(message) {
    this.setState(prevState => ({
      errorMessage: message
    }));
  }

  onSelectType(type) {
    this.props.dispatch(select_free_type(type));
  }

  onChangeField(type, value) {
    if (type === "receiver") {
      this.checkReceiver(value);
      this.props.dispatch(change_receiver(value));
    } else {
      var _value = parseInt(value);
      this.props.dispatch(change_value(isNaN(_value) ? 0 : _value));
    }
    this.setError("")
  }

  checkReceiver(username) {
    var _self = this;
    _self.isVerifyReceiver = false;

    if (this.checkingReceiverSource) {
      this.checkingReceiverSource.cancel();
      this.checkingReceiverSource = undefined;
    }
    this.checkingReceiverSource = CancelToken.source();

    httpService.post2("", {
      command: "check_user_exist",
      username
    },{
      cancelToken:  this.checkingReceiverSource.token
    }).then(async function (response) {
      var data = response.data;
      if (typeof data.status == "undefined") {
        // _self.setError("Server error");
      } else if (data.status) {
      } else {
        _self.isVerifyReceiver = true;
        _self.forceUpdate();
      }
    }).catch(function (thrown) {
      console.log('thrown submit cast in', thrown);
    });
  }

  goHistory() {
    this.props.dispatch(go_history());
  }

  showTutorial(type, value) {
    this.props.dispatch(toggle_tutorial(!this.props.tutorialPopupStatus));
  }

  toggleHistory() {
    this.props.dispatch(toggle_tutorial(!this.props.tutorialPopupStatus));
  }

  onOpenHistory() {
    this.props.dispatch(toggle_tutorial(true));
  }

  onCloseHistory() {
    this.props.dispatch(toggle_tutorial(false));
  }


  render() {
    const {feeType, receiver, value, ratio, money, tutorialPopupStatus} = this.props;
    const {isVerifyReceiver} = this;
    var remainingRatio = 1;
    var receiveValue = value;
    if (feeType == "sender") {
      remainingRatio += ratio;
    } else {
      receiveValue = parseInt(value * (1 - ratio))
    }
    var remainingGold = parseInt(money - remainingRatio * value);

    return (

      <Container style={{backgroundColor: '#2a3146'}}>
        <HeaderComponent/>
        <Image source={glow2} style={styles.container}>
          <Content padder style={{backgroundColor: 'transparent'}}>
            <View style={styles.bg}>
              <View style={styles.innerView}>
                <Item style={styles2.inputWrapper}>
                  <Input style={{textAlign: 'center', paddingRight: 20, paddingLeft: 20}}
                         autoCorrect={false}
                         placeholder={"Người nhận"}
                         placeholderTextColor="#7481a7"
                         onChangeText={receiver => this.onChangeField("receiver", receiver)}
                         defaultValue={receiver}
                  />
                  {isVerifyReceiver && <Icon active name="ios-arrow-dropdown-circle" style={styles.isVerifyReceiver}/>}
                </Item>
                <Item style={styles2.inputWrapper}>
                  <Input style={{textAlign: 'center', paddingRight: 20, paddingLeft: 20}}
                         placeholder={"Số vàng"}
                         keyboardType="numeric"
                         placeholderTextColor="#7481a7"
                         onChangeText={value => this.onChangeField("value", value)}
                         defaultValue={value}
                  />
                </Item>
              </View>

              <View style={styles.radioContainer}>
                <View style={styles.checkboxList}>
                  <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                    <Radio selected={feeType == "sender"} onPress={this.onSelectType.bind(this, "sender")}
                           radioColor="#86b4ff" color="#86b4ff"/>
                    <Text onPress={this.onSelectType.bind(this, "sender")} style={styles.checkboxText}>
                      Người gửi chịu phí
                    </Text>
                  </View>
                  <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                    <Radio selected={feeType != "sender"} onPress={this.onSelectType.bind(this, "receiver")}
                           radioColor="#86b4ff" color="#86b4ff"/>
                    <Text onPress={this.onSelectType.bind(this, "receiver")} style={styles.checkboxText}>
                      Người nhận chịu phí
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.innerView}>
                <Text style={styles.errorMessage}>
                  {this.state.errorMessage}
                </Text>
                {value != 0 && <View style={[styles.centerBox]}>
                  <Text style={{color: '#7481a7', textAlign: "right"}}> Còn lại </Text>
                  <Text style={{color: '#ffde00', fontWeight: "bold"}}>
                    <NumberFormater style={{color: '#ffde00',}} format="0,0">{remainingGold} V </NumberFormater>
                  </Text>
                </View>}
                {receiver.length > 0 && <View style={styles.centerBox}>
                  <Text style={{color: '#86b4ff', fontWeight: "bold"}}> {receiver} </Text>
                  <Text style={styles.centerBox}>
                    <Text style={{color: '#7481a7',}}> nhận được </Text>
                    <Text style={{color: '#ffde00', fontWeight: "bold"}}>
                      <NumberFormater style={{color: '#ffde00',}} format="0,0">{receiveValue} V </NumberFormater>
                    </Text>
                  </Text>
                </View>}

                <Button rounded block style={styles.buttonYellow} onPress={this.submit.bind(this)}>
                  <Text style={{color: '#ffffff', fontWeight: "bold"}}>
                    CHUYỂN VÀNG
                  </Text>
                </Button>
              </View>
              <View style={styles.buttonGroup}>
                <Button style={styles.buttonHistory} onPress={() => this.goHistory()}>
                  <Text style={styles.buttonHistoryText}> Lịch sử </Text>
                </Button>

                <Button style={styles.buttonHistory} onPress={() => this.showTutorial()}>
                  <Text style={styles.buttonHistoryText}> Hướng dẫn </Text>
                </Button>
              </View>

            </View>

          </Content>

          <Modal
            style={[modalStyle.modal, modalStyle.modal2]}
            backdrop={true}
            ref={(c) => {
              this.modal = c;
            }}
            swipeToClose={false}
            isOpen={tutorialPopupStatus}
            onClosed={this.onCloseHistory.bind(this)}
            onOpened={this.onOpenHistory.bind(this)}
          >
            <View style={modalStyle.header}>
              <Text style={{color: "#c4e1ff"}}>
                HƯỚNG DẪN
              </Text>
              <Button
                transparent
                style={{position: 'absolute', top: 0, right: 0}}
                onPress={this.toggleHistory.bind(this)}
              >
                <Icon name="close" style={{color: '#c4e1ff'}}/>
              </Button>
            </View>
            <View style={modalStyle.space}>
              <ScrollView >
                <Text style={styles.descriptionText}>
                  - Người gửi phải từ vip 3, level 3 trở lên mới được chuyển vàng đi, người nhận không bị giới hạn.
                </Text>
                <Text style={styles.descriptionText}>
                  - Sau khi chuyển vàng cần còn lại trên 50.000 vàng
                </Text>
                <Text style={styles.descriptionText}>
                  - Số vàng chuyển 1 lần tối thiểu là 50.000 vàng
                </Text>
                <Text style={styles.descriptionText}>
                  - Số vàng có thể chuyển trong ngày tối đa là 10.000.000
                </Text>
                <Text style={styles.descriptionText}>
                  - Phí chuyển vàng có thể do người gửi hoặc người nhận chịu.
                </Text>
              </ScrollView>
            </View>
          </Modal>
        </Image>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
  };
}

const mapStateToProps = state => {
  const {feeType, receiver, value, ratio, tutorialPopupStatus} = state.transferScene;
  const {loginInfo} = state.auth;
  return {
    feeType,
    receiver,
    value,
    ratio,
    money: loginInfo.money || 0,
    tutorialPopupStatus: tutorialPopupStatus
  }
}
const TransferWidthRedux = connect(mapStateToProps)(TransferComponent);

export function getTransfer() {
  return TransferWidthRedux;
}

export default TransferWidthRedux;
