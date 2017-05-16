import React, {Component} from 'react';
import {Image, Platform, AsyncStorage, TouchableHighlight, View} from 'react-native';
import {connect} from 'react-redux';
import {Actions, ActionConst} from 'react-native-router-flux';
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
import FooterComponent from './../footer';
import HeaderComponent from './../header';
import styles from './styles';
import styles2 from '../login/styles';
import {logout} from '../../actions/auth';


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
      configGold: {
        10000: 10000,
        20000: 20000,
        50000: 50000,
        100000: 100000,
        200000: 200000,
        500000: 500000
      },
      selectedCard: {
        name: "Mobifone",
        code: "vtt"
      }
    };
  }


  logout() {
    var _self = this;
    console.error("logout");
    _logout();
    async function _logout() {
      try {
        await AsyncStorage.removeItem('authData');
        _self.props.dispatch(logout());
        Actions.login({type: ActionConst.RESET});
        // Actions.home();
      } catch (error) {
        console.log("logout error", error);
      }
    };

  }


  onSelectCard(item) {
    console.log("onSelectCard", item);
    this.setState(prevState => {
      console.log("prevState", prevState);
      return Object.assign({}, prevState, {
        selectedCard: item
      })
    });
    console.log("this.state",this.state);
  }

  render() {
    const {isActived, username, gold, mobile} = this.props;
    const {configGold, selectedCard} = this.state;

    var configTemp = [];
    for (propretires in configGold) {
      configTemp.push(<Text key={propretires} style={{color: '#56607d', textAlign: "center", height: 25}}>
        {propretires} VND : {configGold[propretires]} V
      </Text>);

    }

    var cardsTemp1 = [];
    var cardsTemp2 = [];
    configCard.forEach((item, index) => {
      var tempArr = index < 3 ? cardsTemp1 : cardsTemp2;
      tempArr.push(item);
    });

    return (
      <Container style={{backgroundColor: '#2a3146'}}>
        <Image source={glow2} style={styles.container}>
          <HeaderComponent/>


          <View style={styles.cardWrappers}>
            {cardsTemp1.map((item, index)=>{
              console.log("rerender map");
              var template = item.code === selectedCard.code ? <Image source={item.image} key={item.code} resizeMode='cover' style={styles.cardImageActive}/> :
               <TouchableHighlight onPress={ () => this.onSelectCard(item) }><Image source={item.image} key={item.code} resizeMode='cover' style={styles.cardImage}/></TouchableHighlight>;
               return template;
            })}
          </View>
          <View style={styles.cardWrappers}>
            {cardsTemp2.map((item, index)=>{
              console.log("rerender map2");
              var template = item.code === selectedCard.code ? <Image source={item.image} key={item.code} resizeMode='cover' style={styles.cardImageActive}/> :
                <TouchableHighlight onPress={ () => this.onSelectCard(item) }><Image source={item.image} key={item.code} resizeMode='cover' style={styles.cardImage}/></TouchableHighlight>;
              return template;
            })}
          </View>

          <Content padder style={{backgroundColor: 'transparent'}}>

            <View style={styles.bg}>
              <View style={styles2.innerView}>

                <Item style={styles2.inputWrapper}>
                  <Input style={{textAlign: 'center', paddingRight: 20, paddingLeft: 20}}
                         autoCorrect={false}
                         placeholder={"Seri thẻ " + selectedCard.name}
                         placeholderTextColor="#7481a7"
                         onChangeText={serial => this.setState({serial})}
                  />
                </Item>
                <Item style={styles2.inputWrapper}>
                  <Input style={{textAlign: 'center', paddingRight: 20, paddingLeft: 20}}
                         placeholder={"Mã thẻ " + selectedCard.name}
                         placeholderTextColor="#7481a7"
                         secureTextEntry
                         onChangeText={code => this.setState({code})}
                  />
                </Item>
                <Text style={{
                  height: 30,
                  color: 'red',
                  marginBottom: (Platform.OS === 'ios') ? 10 : 0,
                  marginTop: (Platform.OS === 'ios') ? 10 : 0
                }}>
                  {this.state.errorMessage}
                </Text>
                <Button rounded block style={styles2.loginButton} onPress={ () => this.submit() }>
                  <Text style={{color: '#ffffff', fontWeight: "bold"}}>
                    Nạp vàng
                  </Text>
                </Button>
                <View style={{marginTop: 20}}>
                  {configTemp}
                </View>

                <Text style={{
                  height: 30,
                  color: 'red',
                  marginBottom: (Platform.OS === 'ios') ? 10 : 0,
                  marginTop: (Platform.OS === 'ios') ? 10 : 0
                }}>
                  {this.state.errorMessage}
                </Text>
              </View>
            </View>


            <Button
              style={styles.roundedButton}
              onPress={() => this.logout()}
            >
              <Icon active name="close" style={styles.closeIcon}/>
            </Button>
          </Content>

          <Footer style={{borderTopWidth: 0, backgroundColor: 'transparent'}}>
            <FooterComponent navigator={this.props.navigation}/>
          </Footer>
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
  const {loginInfo} = state.auth;
  return {
    isActived: loginInfo.isTelephoneVerified,
    username: loginInfo.username,
    gold: loginInfo.gold || 0,
  }
};

export default connect(mapStateToProps, bindAction)(CashIn);
