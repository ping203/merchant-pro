import React, {Component} from 'react';
import {Image, Platform, AsyncStorage, TouchableHighlight, View, Alert, ScrollView} from 'react-native';
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
import FooterComponent from '../../components/footer/index';
import HeaderComponent from '../../components/header/index';
import styles from './styles';

const glow2 = require('../../../images/glow2-new.png');
const giftImage = require('../../../images/cashOut/gift.png');
import { change_footer } from '../../actions/footerState';

class CashoutComponent extends Component {  //eslint-disable-line

  static propTypes = {
    openDrawer: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // this.getTransferConfig().done();
  }


  render() {
    console.log("render cashOut");
    const {dispatch} = this.props;
    return (

      <Container style={{backgroundColor: '#2a3146'}}>
        <HeaderComponent/>
        <Image source={glow2} style={styles.container}>
          <Content padder style={{backgroundColor: 'transparent'}}>
            <View style={styles.bg}>
              <View style={styles.innerView}>
                <Image source={giftImage} style={styles.giftImage}/>
                <Button rounded block style={styles.button} onPress={ () => Actions.mobileCards() }>
                  <Text style={{color: '#b9cbdc'}}>
                    Thẻ cào
                  </Text>
                </Button>
                <Button rounded block style={styles.button} onPress={ () => Actions.itemsCashOut() }>
                  <Text style={{color: '#b9cbdc'}}>
                    Vật phẩm
                  </Text>
                </Button>
                <Button rounded block style={styles.button} onPress={ () => Actions.merchants() }>
                  <Text style={{color: '#b9cbdc'}}>
                    Đại lý
                  </Text>
                </Button>
                <Button rounded block style={styles.button} onPress={ () => {
                  dispatch(change_footer("cashOutHistory"));
                  Actions.cashOutHistory();
                }}>
                  <Text style={{color: '#b9cbdc'}}>
                    Nhận quà
                  </Text>
                </Button>

              </View>
            </View>

          </Content>
          <Footer style={{borderTopWidth: 0, backgroundColor: 'transparent'}}>
            <FooterComponent navigator={this.props.navigation}/>
          </Footer>

        </Image>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {}
};

export default connect(mapStateToProps)(CashoutComponent);
