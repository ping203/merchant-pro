import React, {Component} from 'react';
import {Image, View, ListView, RefreshControl, TouchableHighlight, Alert} from 'react-native';
import {connect} from 'react-redux';
import {
  Container,
  Content,
  Button,
  Icon,
  Text,
} from 'native-base';

import {fetchPosts} from './actions';
import HeaderComponent from '../../components/header/index';
import InfiniteScrollView from 'react-native-infinite-scroll-view';
import NumberFormater from '../../components/numberFormatter';
import styles from './styles';
import modalStyle from '../../components/styles/modal';
let moment = require('moment');
import Modal from 'react-native-modalbox';
import httpService from '../../common/http';
import {logout, update_gold} from '../../actions/auth';

moment.locale('vi');

const glow2 = require('../../../images/glow2-new.png');


class ItemsCashOutComponent extends Component {
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
  }

  componentWillMount() {
    this._loadMoreContentAsync.call(this);
  }

  _loadMoreContentAsync() {
    this.props.dispatch(fetchPosts({
      "command": "fetch_cash_out_item",
      "type": 1,
      "skip": this.props.items.length,
      "limit": 30
    }));
  }

  submit() {
    var _self = this;
    const {modalData} = this.modalData;
    const {providerCode, netValue, price, imageUrl, name, id} = modalData;

    httpService.postWithConvert("", {
      command: "cash_out",
      productId : id
    }).then(async function (response) {
      if (response.status) {
        // _self.setError(data.message);
      } else {
        _self.props.dispatch(update_gold(response.money));
      }

      Alert.alert(
        'Thông báo',
        response.message,
        [
          {text: 'OK', onPress: () =>{ _self.closeModal.call(_self)}},
        ],
        {cancelable: true}
      )
    }).catch(function (thrown) {
      console.log('thrown submit cast in', thrown);
      Alert.alert(
        'Thông báo',
        thrown,
        [
          {text: 'OK', onPress: () =>{_self.closeModal.call(_self)}},
        ],
        {cancelable: true}
      )
    });
  };

  componentWillReceiveProps(nextProps) {
    this.dataSource = this.getUpdatedDataSource(nextProps);
    this.forceUpdate();
  }

  getUpdatedDataSource(props) {
    let items = props.items.slice();
    var rows = [];
    while (items.length) {
      rows.push(items.splice(0, 2));
    }
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

  showConfirmPopup(itemData) {
    this.modalData = {
      openModal: true,
      modalData: itemData
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


  _renderRowData(rowData) {
    var _self = this;
    let firstItem = rowData[0];
    let seconItem = rowData[1];

    function createItem(itemData) {
      const {providerCode, netValue, price, imageUrl, name, id} = itemData;
      return (
        <TouchableHighlight onPress={() => _self.showConfirmPopup(itemData)}>
          <View style={styles.historyRight}>
            <Image style={styles.itemImage} source={{uri: imageUrl}}></Image>
            <Text style={styles.priceWraper}>
              <NumberFormater format="0,0" style={styles.price}>{price}</NumberFormater>V
            </Text>
          </View>
        </TouchableHighlight>)
    }

    // Reload all data
    return (
      <View style={styles.historyItem}>
        <View style={styles.historyLeft}>
          {firstItem && createItem(firstItem)}
        </View>
        <View style={styles.historyRight}>
          {seconItem && createItem(seconItem)}
        </View>
      </View>
    );
  }

  setError(message) {
    this.setState(prevState => ({
      errorMessage: message
    }));
  }

  render() {
    const {items, total, skip, money} = this.props;
    // console.log("!items.length || items.length < total",!items.length, items.length < total,!items.length || items.length < total)
    const {openModal, modalData} = this.modalData;

    {/*const {providerCode, netValue, price, imageUrl, name, id} = itemData;*/}
    return (
      <Container style={{backgroundColor: '#2a3146'}}>
        <HeaderComponent/>
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
        <Modal
          style={[modalStyle.modal, modalStyle.modal2, styles.confirmModal]}
          backdrop={true}
          ref={(c) => {
            this.modal = c;
          }}
          swipeToClose={false}
          isOpen={openModal}
        >
          <View style={modalStyle.header}>
            <Text style={{color: "#c4e1ff"}}>
              XÁC NHẬN
            </Text>
            <Button
              transparent
              style={{position: 'absolute', top: 0, right: 0}}
              onPress={this.closeModal.bind(this)}
            >
              <Icon name="close" style={{color: '#c4e1ff'}}/>
            </Button>
          </View>
          <View style={[modalStyle.space, styles.modalContent]}>
            <Text style={styles.modalText}>
              Đổi{"\u0020"}
              <Text style={styles.yellowText}>
                <NumberFormater format="0,0" style={styles.yellowText}>{modalData.price}</NumberFormater>
                {"\u0020"}vàng
              </Text>
              {"\u0020"}lấy thẻ cào{"\u0020"}
              <Text style={styles.yellowText}>{modalData.name}</Text>
              {"\u0020"}?
            </Text>
            <Text style={styles.modalText}>
              Vàng còn lại:{"\u0020"}
              <Text style={styles.yellowText}>
                <NumberFormater format="0,0" style={styles.yellowText}>
                  {money - modalData.price}
                </NumberFormater>
                {"\u0020"}V
              </Text>
            </Text>
            <View style={styles.modalButtonBar}>
              <Button rounded block style={styles.whiteButton}
                      onPress={this.closeModal.bind(this)}>
                <Text style={styles.whiteButtonText}>
                  Hủy bỏ
                </Text>
              </Button>
              <Button rounded block style={styles.yellowButton}
                      onPress={this.submit.bind(this)}>
                <Text style={styles.yellowButtonText}>
                  Đồng ý
                </Text>
              </Button>
            </View>
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
  const {items, total, skip, isFetching} = state.itemsCashOut;
  const {loginInfo} = state.auth;
  return {
    items, total, skip, isFetching,
    money: loginInfo.money || 0,
  };
};

export default connect(mapStateToProps)(ItemsCashOutComponent);
