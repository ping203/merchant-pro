import React, {Component} from 'react';
import {Image, Platform, AsyncStorage, TouchableHighlight, View, Alert} from 'react-native';
import {connect} from 'react-redux';
import {Actions, ActionConst} from 'react-native-router-flux';
import httpService from '../../common/http';
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  List,
  ListItem,
  Text,
  Footer,
  Left,
  Right,
  Radio,
  Item,
  Input
} from 'native-base';

import {openDrawer} from '../../actions/drawer';
import FooterComponent from './../footer';
import HeaderComponent from './../header';
import ConfirmComponent from './../confirmPopup';
import styles from './styles';
import styles2 from '../login/styles';
import {logout} from '../../actions/auth';
import {select_free_type, change_receiver, change_value, update_config_ratio} from './actions';


const glow2 = require('../../../images/glow2-new.png');
const vttImage = require('../../../images/cards/vtt.png');
const vmsImage = require('../../../images/cards/vms.png');
const vnpImage = require('../../../images/cards/vnp.png');
const bitImage = require('../../../images/cards/bit.png');
const gateImage = require('../../../images/cards/gate.png');
const vcoinImage = require('../../../images/cards/vcoin.png');

const configCard = [{
  name: "Viettel",
  code: "vtt",
  image: vttImage
}, {
  name: "Mobifone",
  code: "vms",
  image: vmsImage
}, {
  name: "VinaPhone",
  code: "vnp",
  image: vnpImage
}, {
  name: "Bitcoin",
  code: "bit",
  image: bitImage
}, {
  name: "Gate",
  code: "gate",
  image: gateImage
}, {
  name: "Vcoin",
  code: "vcoin",
  image: vcoinImage
}]

class CashIn extends Component {  //eslint-disable-line

  static propTypes = {
    openDrawer: React.PropTypes.func,
  }

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
    this.getCardConfig().done();
  }

  getCardConfig = async () => {
    var _self = this;
    httpService.post2("", {
      command: "fetch_cash_in_exchange",
      cashInType: 1

    }).then(async function (response) {
      var data = response.data.data;
      if (data) {
        _self.props.dispatch(update_config_ratio(data["1"]));
      }
    }).catch(function (thrown) {
      console.log('thrown.message 4', thrown);
      _self.setError(thrown);
    });
  };


  logout() {
    var _self = this;
    console.log("logout");
    _logout();
    async function _logout() {
      console.log("_logout");
      await AsyncStorage.removeItem('authData');
      _self.props.dispatch(logout());
      Actions.login({type: ActionConst.RESET});
    };
  }


  submit() {
    var _self = this;
    console.log("this.props", this.props);
    const {code, serial, selectedCardType} = this.props;
    httpService.post2("", {
      command: "cash_in",
      type: 1,
      code,
      serial,
      telco: selectedCardType.code
    }).then(async function (response) {
      var data = response.data;
      console.log("response.data", response.data);
      if (data.status) {
        _self.setError(data.message);
      } else {
        _self.setError("");
        Alert.alert(
          'Thông báo',
          'Bạn đã nạp thẻ thành công',
          [
            // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
            // {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          {cancelable: true}
        )
      }
    }).catch(function (thrown) {
      console.log('thrown submit cast in', thrown);
      _self.setError(thrown);
    });
  };


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
      this.props.dispatch(change_receiver(value));
    } else {
      var _value = parseInt(value);
      this.props.dispatch(change_value(isNaN(_value)? 0 : _value));
    }
  }


  render() {
    const {feeType, receiver, value, ratio, gold} = this.props;
    var remainingRatio = 1;
    var receiveValue = value;
    if(feeType == "sender"){
      remainingRatio += ratio;
    }else{
      receiveValue = parseInt(value*(1 - ratio))
    };
    var remainingGold = parseInt(gold - remainingRatio*value);

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
                  />
                </Item>
                <Item style={styles2.inputWrapper}>
                  <Input style={{textAlign: 'center', paddingRight: 20, paddingLeft: 20}}
                         placeholder={"Số vàng"}
                         keyboardType="numeric"
                         placeholderTextColor="#7481a7"
                         onChangeText={value => this.onChangeField("value", value)}
                  />
                </Item>
              </View>

              <View style={styles.radioContainer}>
                <View style={styles.checkboxList}>
                  <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                    <Radio selected={feeType == "sender"} onPress={this.onSelectType.bind(this, "sender")}
                           radioColor="#86b4ff" color="#86b4ff"/>
                    <Text onPress={this.onSelectType.bind(this, "sender")} style={{color: "#86b4ff", paddingLeft: 5}}>
                      Người gửi chịu phí
                    </Text>
                  </View>
                  <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                    <Radio selected={feeType != "sender"} onPress={this.onSelectType.bind(this, "receiver")}
                           radioColor="#86b4ff" color="#86b4ff"/>
                    <Text onPress={this.onSelectType.bind(this, "receiver")} style={{color: "#86b4ff", paddingLeft: 5}}>
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
                  <Text style={{color: '#ffde00', fontWeight: "bold"}}> {remainingGold} V </Text>
                </View>}
                {receiver.length > 0 && <View style={styles.centerBox}>
                  <Text style={{color: '#86b4ff', fontWeight: "bold"}}> {receiver} </Text>
                  <Text style={styles.centerBox}>
                    <Text style={{color: '#7481a7', }}> nhận được</Text>
                    <Text style={{color: '#ffde00', fontWeight: "bold"}}> {receiveValue} V</Text>
                  </Text>
                </View>}

                <Button rounded block style={styles.buttonYellow} onPress={this.submit.bind(this)}>
                  <Text style={{color: '#ffffff', fontWeight: "bold"}}>
                    CHUYỂN VÀNG
                  </Text>
                </Button>

                <View style={[styles.centerBox]}>
                  <Button style={styles.centerBox} onPress={() => this.logout()}>
                    <Text style={{color: 'red', fontWeight: "bold"}}> Lịch sử </Text>
                  </Button>

                  <Button style={styles.centerBox} >
                    <Text style={{color: 'red', fontWeight: "bold"}}> Hướng dẫn </Text>
                  </Button>
                </View>

                <Button
                  style={styles.roundedButton}
                  onPress={() => this.logout()}
                >
                  <Icon active name="close" style={styles.closeIcon}/>
                </Button>
              </View>
            </View>

          </Content>
          <Footer style={{borderTopWidth: 0, backgroundColor: 'transparent'}}>
            <FooterComponent navigator={this.props.navigation}/>
          </Footer>
          <ConfirmComponent ></ConfirmComponent>
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
  const {feeType, receiver, value, ratio} = state.tranferScene;
  const {loginInfo} = state.auth;
  return {
    feeType,
    receiver,
    value,
    ratio,
    gold: loginInfo.gold || 0,
  }
};

export default connect(mapStateToProps, bindAction)(CashIn);
