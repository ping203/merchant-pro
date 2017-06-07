import React, {Component} from 'react';
import {Image, Platform, AsyncStorage, TouchableHighlight, View, Alert, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {Actions, ActionConst} from 'react-native-router-flux';
import httpService from '../../common/http';
import {
  Container,
  Content,
  Button,
  Text,
  Icon,
} from 'native-base';

import HeaderComponent from '../../components/header/index';
import styles from './styles';

const glow2 = require('../../../images/glow2-new.png');
const giftImage = require('../../../images/cashOut/gift.png');
import {change_footer} from '../../actions/footerState';
import cashOutTab from '../cashOutTab';
import homeNavigation from '../home';

import Modal from 'react-native-modalbox';
import modalStyle from '../../components/styles/modal';

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

  goOtherPage(routerName) {
    this.props.dispatch(cashOutTab.router.getActionForPathAndParams(routerName));
  }

  goCashOutHistory() {
    this.props.dispatch(homeNavigation.router.getActionForPathAndParams("cashOutHistory"));
  }


  render() {
    const {dispatch} = this.props;
    return (

      <Container style={{backgroundColor: '#2a3146'}}>
        <HeaderComponent/>
        <Image source={glow2} style={styles.container}>
          <Content padder style={{backgroundColor: 'transparent'}}>
            <View style={styles.bg}>
              <View style={styles.innerView}>
                <Image source={giftImage} style={styles.giftImage}/>
                <Button rounded block style={styles.button}
                        onPress={ () => this.goOtherPage.call(this, 'mobileCards') }>
                  <Text style={{color: '#b9cbdc'}}>
                    Thẻ cào
                  </Text>
                </Button>
                <Button rounded block style={styles.button}
                        onPress={ () => this.goOtherPage.call(this, 'itemsCashOut') }>
                  <Text style={{color: '#b9cbdc'}}>
                    Vật phẩm
                  </Text>
                </Button>
                <Button rounded block style={styles.button} onPress={ () => this.goOtherPage.call(this, 'merchants') }>
                  <Text style={{color: '#b9cbdc'}}>
                    Đại lý
                  </Text>
                </Button>
                <Button rounded block style={styles.button} onPress={ () => this.modal.open() }>
                  <Text style={{color: '#b9cbdc'}}>
                    Ngân hàng
                  </Text>
                </Button>
                <Button rounded block style={styles.button} onPress={ () => this.goCashOutHistory.call(this)}>
                  <Text style={{color: '#b9cbdc'}}>
                    Nhận quà
                  </Text>
                </Button>

              </View>
            </View>

          </Content>
          {/*<Footer style={{borderTopWidth: 0, backgroundColor: 'transparent'}}>*/}
          {/*<FooterComponent navigator={this.props.navigation}/>*/}
          {/*</Footer>*/}

        </Image>
        <Modal
          style={[modalStyle.modal, modalStyle.modal2]}
          backdrop={true}
          ref={(c) => {
            this.modal = c;
          }}
          swipeToClose={false}
          isOpen={this.openTutorial}
        >
          <View style={modalStyle.header}>
            <Text style={{color: "#c4e1ff"}}>
              THÔNG BÁO
            </Text>
            <Button
              transparent
              style={{position: 'absolute', top: 0, right: 0}}
              onPress={() => this.modal.close()}
            >
              <Icon name="close" style={{color: '#c4e1ff'}}/>
            </Button>
          </View>
          <View style={{margin: 10}}>
            <Text style={styles.descriptionText}>
              Chức năng sắp ra mắt !
            </Text>
          </View>
        </Modal>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {}
};

export default connect(mapStateToProps)(CashoutComponent);
