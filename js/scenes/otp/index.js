import React, {Component} from 'react';
import {
  Image,
  Platform,
  AsyncStorage,
  TouchableHighlight,
  View,
  Alert,
  ListView,
  ScrollView,
  Clipboard
} from 'react-native';
import {connect} from 'react-redux';
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
import HeaderComponent from '../../components/header/index';
import ConfirmComponent from '../../components/confirmPopup/index';
import styles from './styles';
jsSHA = require("jssha");

const glow2 = require('../../../images/glow2-new.png');


const TOTP = function() {

  var dec2hex = function(s) {
    return (s < 15.5 ? "0" : "") + Math.round(s).toString(16);
  };

  var hex2dec = function(s) {
    return parseInt(s, 16);
  };

  var leftpad = function(s, l, p) {
    if(l + 1 >= s.length) {
      s = Array(l + 1 - s.length).join(p) + s;
    }
    return s;
  };

  var base32tohex = function(base32) {
    var base32chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
    var bits = "";
    var hex = "";
    for(var i = 0; i < base32.length; i++) {
      var val = base32chars.indexOf(base32.charAt(i).toUpperCase());
      bits += leftpad(val.toString(2), 5, '0');
    }
    for(var i = 0; i + 4 <= bits.length; i+=4) {
      var chunk = bits.substr(i, 4);
      hex = hex + parseInt(chunk, 2).toString(16) ;
    }
    return hex;
  };

  this.getOTP = function(secret) {
    try {
      var epoch = Math.round(new Date().getTime() / 1000.0);
      var time = leftpad(dec2hex(Math.floor(epoch / 30)), 16, "0");
      var hmacObj = new jsSHA(time, "HEX");
      var hmac = hmacObj.getHMAC(base32tohex(secret), "HEX", "SHA-1", "HEX");
      var offset = hex2dec(hmac.substring(hmac.length - 1));
      var otp = (hex2dec(hmac.substr(offset * 2, 8)) & hex2dec("7fffffff")) + "";
      otp = (otp).substr(otp.length - 6, 6);
    } catch (error) {
      throw error;
    }
    return otp;
  };

};

const totpObj = new TOTP();

class News extends Component {

  static navigationOptions = ({navigation}) => ({
    title: `OTP`,
  });

  constructor(props) {
    super(props);
    this.state = {
      code : totpObj.getOTP("c567plus")
    };
  }
  componentDidMount() {
    this.timerID = setInterval(
      () => this.setOtp(),
      1000
    )
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  setOtp() {
    this.setState({
      code : totpObj.getOTP("c567plus")
    })
  }

  copy() {
    Clipboard.setString(this.state.code);
  }


  render() {
    const {code} = this.state;
    const _self = this;
    var epoch = Math.round(new Date().getTime() / 1000.0);
    var time = 30-Math.floor(epoch % 30);
    return (

      <Container style={{backgroundColor: '#2a3146'}}>
        <HeaderComponent/>
        <Image source={glow2} style={styles.container}>
          <Content padder style={{backgroundColor: 'transparent'}}>
            <Text style={styles.newsListTittle}>MÃ OTP</Text>
            <View style={styles.bg}>

              <Item style={styles.inputWrapper}>
                <Input style={{textAlign: 'center', paddingRight: 50, paddingLeft: 50}}
                       placeholder="Mã OTP"
                       placeholderTextColor="#7481a7"
                       defaultValue={code}
                       editable={false}
                />
              </Item>
              <Text style={styles.note}>
                Sử dụng mã bảo vệ trên đây để xác nhận ({time})
              </Text>
              <Button rounded block style={styles.loginButton} onPress={ () => this.copy() }>
                <Text style={{color: '#ffffff'}}>
                  Copy
                </Text>
              </Button>
            </View>

          </Content>
        </Image >
      </ Container >
    );
  }
}


const mapStateToProps = state => {
  const {loginInfo, username} = state.auth;
  return {
    isActived: loginInfo.isTelephoneVerified,
    username: loginInfo.username,
  }
};

export default connect(mapStateToProps)(News);
