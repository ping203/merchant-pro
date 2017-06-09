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
  Body,
  Item,
  Input
} from 'native-base';

import {openDrawer} from '../../actions/drawer';
import FooterComponent from '../../components/footer/index';
import HeaderComponent from '../../components/header/index';
import ConfirmComponent from '../../components/confirmPopup/index';
import styles from './styles';
import styles2 from '../login/styles';
import {logout, update_gold} from '../../actions/auth';
import {select_card_type, change_code, change_serial, update_config_ratio} from './actions';
import { NavigationActions } from 'react-navigation';


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

  static navigationOptions = ({navigation}) => ({
    title: `NẠP VÀNG`,
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
    if (!this.props.configGoldRatio.length) {
      this.getCardConfig().done();
    }
  }

  componentDidUpdate() {
    // this.getCardConfig().done();
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
  }


  logout(){
    const {dispatch} = this.props;
    dispatch(logout());
  }


  submit() {
    var _self = this;
    const {code, serial, selectedCardType} = this.props;
    if(!(serial && serial.length) ||  !(code && code.length)){
      _self.setError("Vui lòng nhập thông tin thẻ nạp");
      return;
    }
    httpService.post2("", {
      command: "cash_in",
      type: 1,
      code,
      serial,
      telco: selectedCardType.code
    }).then(async function (response) {
      var data = response.data;
      if (typeof data.status === "undefined") {
        _self.setError("Server error");
      } else if (data.status) {
        _self.setError(data.message);
      } else {
        _self.setError("");
        _self.props.dispatch(update_gold(data.money));
        Alert.alert(
          'Thông báo',
          data.message,
          [
            {text: 'OK', onPress: () => _self.clear()},
          ],
          {cancelable: true}
        )
      }
    }).catch(function (thrown) {
      console.log('thrown submit cast in', thrown);
      if(typeof thrown == "object"){
        thrown = "Lỗi kết nối, vui lòng thử lại sau."
      }
      _self.setError(thrown);
    });
  };
  clear(){
    this.props.dispatch(change_code(""));
    this.props.dispatch(change_serial(""));
  }

  setError(message) {
    this.setState(prevState => ({
      errorMessage: message
    }));
  }

  onSelectCard(item) {
    this.props.dispatch(select_card_type(item));
  }

  onChangeField(type, value) {
    if (type === "code") {
      this.props.dispatch(change_code(value));
    } else {
      this.props.dispatch(change_serial(value));
    }
    this.setError("");
  }


  render() {
    const {selectedCardType, configGoldRatio, serial, code, isActived} = this.props;
    var placeholderCode = "Mã thẻ " + selectedCardType.name;
    var placeholderSerial = "Seri thẻ " + selectedCardType.name;

    var cardsTemp1 = [];
    var cardsTemp2 = [];
    configCard.forEach((item, index) => {
      var tempArr = index < 3 ? cardsTemp1 : cardsTemp2;
      tempArr.push(item);
    });

    return (

      <Container style={{backgroundColor: '#2a3146'}}>
        <HeaderComponent/>
        <Image source={glow2} style={styles.container}>
          <Content padder style={{backgroundColor: 'transparent'}}>
            <View style={styles.cardWrappers}>
              {cardsTemp1.map((item, index) => {
                var template = item.code === selectedCardType.code ?
                  <Image source={item.image} key={item.code} resizeMode='cover' style={styles.cardImageActive}/> :
                  <TouchableHighlight key={item.code} onPress={ () => this.onSelectCard(item) }><Image
                    source={item.image} resizeMode='cover' style={styles.cardImage}/></TouchableHighlight>;
                return template;
              })}
            </View>
            <View style={styles.cardWrappers}>
              {cardsTemp2.map((item, index) => {
                var template = item.code === selectedCardType.code ?
                  <Image source={item.image} key={item.code} resizeMode='cover' style={styles.cardImageActive}/> :
                  <TouchableHighlight key={item.code} onPress={ () => this.onSelectCard(item) }><Image
                    source={item.image} key={item.code} resizeMode='cover'
                    style={styles.cardImage}/></TouchableHighlight>;
                return template;
              })}
            </View>

            <View style={styles.bg}>
              <View style={styles2.innerView}>

                <Item style={styles2.inputWrapper}>
                  <Input style={{textAlign: 'center', paddingRight: 20, paddingLeft: 20}}
                         autoCorrect={false}
                         placeholder={"Serial thẻ"}
                         placeholderTextColor="#7481a7"
                         onChangeText={serial => this.onChangeField("serial", serial)}
                         defaultValue={serial}
                  />
                </Item>
                <Item style={styles2.inputWrapper}>
                  <Input style={{textAlign: 'center', paddingRight: 20, paddingLeft: 20}}
                         autoCorrect={false}
                         placeholder={"Mã thẻ"}
                         placeholderTextColor="#7481a7"
                         onChangeText={code => this.onChangeField("code", code)}
                         defaultValue={code}
                  />
                </Item>
                <Text style={styles.errorMessage}>
                  {this.state.errorMessage}
                </Text>
                <Button rounded block style={styles2.loginButton} onPress={this.submit.bind(this)}>
                  <Text style={{color: '#ffffff', fontWeight: "bold"}}>
                    Nạp vàng
                  </Text>
                </Button>
                <View style={{marginTop: 20}}>
                  {configGoldRatio.map((item, index) => {
                    return <Text key={index} style={{color: '#56607d', textAlign: "center", height: 25}}>
                      {item.gold} {item.currency} : {item.price} V
                    </Text>
                  })
                  }
                </View>

                {/*<Button*/}
                  {/*style={styles.roundedButton}*/}
                  {/*onPress={() => this.logout()}*/}
                {/*>*/}
                  {/*<Icon active name="close" style={styles.closeIcon}/>*/}
                {/*</Button>*/}
              </View>
            </View>

          </Content>


          {!isActived && <ConfirmComponent ></ConfirmComponent>}
        </Image>
      </Container>
    );
  }
}


const mapStateToProps = state => {
  const {selectedCardType, serial, code, configGoldRatio} = state.cashInScene;
  const {loginInfo} = state.auth;
  return {
    isActived: loginInfo.isTelephoneVerified,
    selectedCardType: selectedCardType,
    configGoldRatio: configGoldRatio,
    code,
    serial
  }
};

export default connect(mapStateToProps)(CashIn);
