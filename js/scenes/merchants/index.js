import React, {Component} from 'react';
import {Image, View, ListView, RefreshControl, TouchableHighlight, ScrollView, Alert} from 'react-native';
import {connect} from 'react-redux';
import httpService from '../../common/http';
import {logout, update_gold} from '../../actions/auth';
import {
  Container,
  Button,
  Icon,
  Text,
  Input,
  FooterTab
} from 'native-base';

import {fetchPosts, fetchConfig} from './actions';
import HeaderComponent from '../../components/header/index';
import InfiniteScrollView from 'react-native-infinite-scroll-view';
import NumberFormater from '../../components/numberFormatter';
import styles from './styles';
let moment = require('moment');
import {Actions, ActionConst} from 'react-native-router-flux';
import cashOutTab from '../cashOutTab';

moment.locale('vi');

import Modal from 'react-native-modalbox';
import modalStyle from '../../components/styles/modal';
import TransferMerchantForm from './transferMerchant'
import FooterComponent from '../../components/footer/index';

const glow2 = require('../../../images/glow2-new.png');

class MerchantsComponent extends Component {
  constructor(props, context) {
    super(props);
    this.dataSource = new ListView.DataSource({
      rowHasChanged: this._rowHasChanged.bind(this),
    });
    this.dataSource = this.getUpdatedDataSource(props);
    this.modalData = {
      openModal: false,
      modalData: {}
    }
    this.transferMerchantData = {};
  }

  componentWillMount() {
    this._loadMoreContentAsync.call(this);
  }

  _loadMoreContentAsync() {
    this.props.dispatch(fetchPosts({
      "command": "fetch_list_merchant",
    }));
    this.props.dispatch(fetchConfig({
      "command": "fetch_transfer_config",
    }));
  }

  componentWillReceiveProps(nextProps) {
    this.dataSource = this.getUpdatedDataSource(nextProps);
    this.forceUpdate();
  }

  getUpdatedDataSource(props) {
    let rows = props.items;
    let ids = rows.map((obj, index) => index);
    return this.dataSource.cloneWithRows(rows, ids);
  }

  _rowHasChanged(r1, r2) {
    return JSON.stringify(r1) !== JSON.stringify(r2);
  }

  _renderRefreshControl() {
    // Reload all data
    return (
      <RefreshControl
        refreshing={this.props.isFetching}
        onRefresh={this._loadMoreContentAsync.bind(this)}
      />
    )
  }

  showModal(rowData) {
    this.modalData = {
      openModal: true,
      modalData: rowData
    };
    this.transferMerchantData = {
      merchantName : rowData.merchantUsername
    };
    this.forceUpdate();
  }

  closeModal() {
    this.modalData = {
      openModal: false,
      modalData: {}
    };
    this.forceUpdate();
  }

  setTutorial(flag) {
    this.openTutorial = flag;
    this.forceUpdate();
  }

  goHistory() {
    this.props.dispatch(cashOutTab.router.getActionForPathAndParams('historyTransferMerchant'));
  }

  submit() {
    var _self = this;
    const {merchantName, value, description} = this.transferMerchantData;

    httpService.postWithConvert("", {
      command: "transfer_to_merchant",
      merchantName,
      value,
      description
    }).then(async function (response) {
      if (response.status) {
        Alert.alert(
          'Thông báo',
          response.message,
          [
            {
              text: 'OK', onPress: () => {
            }
            },
          ],
          {cancelable: true}
        )
      } else {
        _self.props.dispatch(update_gold(response.money));
        Alert.alert(
          'Thông báo',
          response.message,
          [
            {
              text: 'OK', onPress: () => {
              _self.closeModal.call(_self)
            }
            },
          ],
          {cancelable: true}
        )
      }
    }).catch(function (thrown) {
      console.log('thrown submit cast in', thrown);
      Alert.alert(
        'Thông báo',
        thrown,
        [
          {
            text: 'OK', onPress: () => {
            _self.closeModal.call(_self)
          }
          },
        ],
        {cancelable: true}
      )
    });
  }

  _renderRowData(rowData) {
    if (!rowData) return;
    const {total, skip, isFetching, username} = this.props;
    const {
      userFee, product, level, displayName, adminFee, cp, subMerchantFee,
      createdTime, rank, id, merchantUsername, bundle, upMerchantFee, address, phone, facebook,
    } = rowData;
    let formatTime = moment(createdTime * 1000).format('h:mm a - D/M/YYYY');

    return (
      <TouchableHighlight onPress={ () => this.showModal(rowData) }>
        <View style={styles.historyItem}>
          <View style={styles.merchantTitle}>
            <Text style={styles.merchantName}> {displayName}</Text>
            <Text style={styles.merchantCode}>
              Mã đại lý <Text style={styles.merchantCodeInner}>{merchantUsername}</Text>
            </Text>
          </View>
          <View style={styles.merchantContent}>
            <Text style={styles.merchantField}>
              Điện thoại : <Text style={styles.merchantValue}>{phone}</Text> {'\n'}
            </Text>
            <Text style={styles.merchantField}>
              Địa chỉ : <Text style={styles.merchantValue}>{address}</Text> {'\n'}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  setError(message) {
    this.setState(prevState => ({
      errorMessage: message
    }));
  }

  setTransferMerchantData(newData) {
    Object.assign(this.transferMerchantData, newData);
    this.transferMerchantData.feeValue = this.props.merchantFee * this.transferMerchantData.value;
    this.forceUpdate();
  }

  render() {
    const {items, total, skip} = this.props;
    const {openModal, modalData} = this.modalData;
    this.transferMerchantData.feeValue = this.transferMerchantData.feeValue ? Math.round(this.transferMerchantData.feeValue).toString() : "0";

    return (
      <Container style={{backgroundColor: '#2a3146'}}>
        <HeaderComponent hasBack/>
        <Image source={glow2} style={styles.container}>
          <View padder style={{backgroundColor: 'transparent'}}>
            <ListView
              renderScrollComponent={props => <InfiniteScrollView {...props} />}
              dataSource={this.dataSource}
              renderRow={(rowData) => this._renderRowData.call(this, rowData)}
              refreshControl={this._renderRefreshControl()}
              onLoadMoreAsync={this._loadMoreContentAsync.bind(this)}
              canLoadMore={!items.length || items.length < total}
              enableEmptySections={true}
            />

          </View>
        </Image>


        <FooterTab style={styles.footer}>

          <View style={styles.buttonGroup}>
            <Button style={styles.buttonHistory} onPress={() => this.goHistory()}>
              <Text style={styles.buttonHistoryText}> Lịch sử </Text>
            </Button>

            <Button style={styles.buttonHistory} onPress={() => this.setTutorial(true)}>
              <Text style={styles.buttonHistoryText}> Hướng dẫn </Text>
            </Button>
          </View>
        </FooterTab>

        <Modal
          style={[modalStyle.modal, modalStyle.modal2, styles.modalWrapper]}
          backdrop={true}
          ref={(c) => {
            this.modal = c;
          }}
          swipeToClose={false}
          isOpen={openModal}
        >
          <View style={modalStyle.header}>
            <Text style={{color: "#c4e1ff", fontWeight: "bold"}}>
              CHUYỂN VÀNG CHO ĐẠI LÝ
            </Text>
            <Button
              transparent
              style={{position: 'absolute', top: 0, right: 0}}
              onPress={this.closeModal.bind(this)}
            >
              <Icon name="close" style={{color: '#c4e1ff'}}/>
            </Button>
          </View>
          <View style={[styles.modalContent]}>
            {/*<TransferMerchantForm initData={modalData} closeModal={this.closeModal} parent={this}/>*/}
            <ScrollView >

              <View style={styles.inputWrapper}>
                <Input style={styles.inputInner}
                       placeholder="Mã đại lý"
                       disabled="true"
                       placeholderTextColor="#7481a7"
                       defaultValue={modalData.merchantUsername}
                />
              </View>
              <View style={styles.inputWrapper}>
                <Input style={styles.inputInner}
                       placeholder="Số vàng"
                       keyboardType="numeric"
                       placeholderTextColor="#7481a7"
                       onChangeText={value => {
                         this.setTransferMerchantData.call(this, {value});
                       }}
                />
              </View>
              <View style={styles.inputWrapper}>
                <Input style={styles.inputInner}
                       placeholder="Phí"
                       disabled="true"
                       keyboardType="numeric"
                       placeholderTextColor="#7481a7"
                       defaultValue={this.transferMerchantData.feeValue }
                />
              </View>
              <View style={styles.inputWrapper}>
                <Input style={styles.inputInner}
                       placeholder="Nội dung chuyển tiền"
                       placeholderTextColor="#7481a7"
                       onChangeText={description => {
                         this.setTransferMerchantData.call(this, {description});
                       }}
                />
              </View>
              <View style={styles.modalButtonBar}>
                <Button rounded block style={styles.whiteButton}
                        onPress={this.closeModal.bind(this)}>
                  <Text style={styles.whiteButtonText}>
                    Hủy bỏ
                  </Text>
                </Button>
                <Button rounded block style={styles.yellowButton}
                        onPress={this.submit.bind(this)}>
                  <Text style={styles.whiteButtonText}>
                    Đồng ý
                  </Text>
                </Button>
              </View>
            </ScrollView>

          </View>
        </Modal>

        <Modal
          style={[modalStyle.modal, modalStyle.modal2]}
          backdrop={true}
          ref={(c) => {
            this.tutorialModal = c;
          }}
          swipeToClose={false}
          isOpen={this.openTutorial}
        >
          <View style={modalStyle.header}>
            <Text style={{color: "#c4e1ff"}}>
              HƯỚNG DẪN
            </Text>
            <Button
              transparent
              style={{position: 'absolute', top: 0, right: 0}}
              onPress={()=>this.setTutorial(false)}
            >
              <Icon name="close" style={{color: '#c4e1ff'}}/>
            </Button>
          </View>
          <View style={modalStyle.space}>
            <ScrollView >
              <Text style={styles.descriptionText}>
                B1: Xem danh sách đại lý, lựa chọn đại lý gần mình nhất.
              </Text>
              <Text style={styles.descriptionText}>
                B2: Liên hệ với đại lý để thỏa thuận tỉ lệ thu mua vàng, tỷ lệ bán vàng cũng như cách thức giao dịch (hẹn gặp giao dịch trực tiếp hay chuyển khoản ngân hàng…)
              </Text>
              <Text style={styles.descriptionText}>
                B3: Đến gặp và thực hiện việc chuyển vàng cho đại lý: Nhấn nút CHUYỂN VÀNG, nhập số vàng muốn chuyển, nội dung chuyển vàng các bạn ghi là: rut xxx vang, sdt: 09xxxxxxxx.
              </Text>
              <Text style={styles.descriptionText}>
                 B4: Nhận tiền mặt hoặc chuyển khoản, hoàn thành giao dịch với đại lý
                Chú ý:
                - Các bạn nên đến gặp trực tiếp đại lý để đảm bảo giao dịch thực hiện thành công. Chỉ thực hiện giao dịch từ xa/ chuyển khoản với đại lý các bạn tin tưởng.
                - Mỗi lần chuyển vàng ít nhất là 100.000 vàng
                - Vàng đã chuyển sẽ không được trả lại. Vì vậy các bạn chú ý chỉ chuyển vàng khi đã thỏa thuận xong với đại lý.
                Hd chuyển vàng cho đại lý
              </Text>
            </ScrollView>
          </View>
        </Modal>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    // openDrawer: () => dispatch(openDrawer()),
  };
}

const mapStateToProps = state => {
  const {items, total, skip, isFetching, merchantFee} = state.merchants;
  const {loginInfo} = state.auth;
  return {
    items, total, skip, isFetching,
    username: loginInfo.username,
    merchantFee
  };
};

export default connect(mapStateToProps)(MerchantsComponent);
