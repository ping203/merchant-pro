import React, {Component} from 'react';
import {Image, View, ListView, RefreshControl, Clipboard} from 'react-native';
import {connect} from 'react-redux';
import {
  Container,
  Content,
  Text,
  Button,
  Footer
} from 'native-base';

import {fetchPosts, refreshListHistory} from './actions';
import {select_card_type, change_code, change_serial, update_config_ratio} from '../cashIn/actions';
import HeaderWithBackComponent from '../../components/header/headerWithBack';
import FooterComponent from '../../components/footer/index';
import HeaderComponent from '../../components/header/index';
import InfiniteScrollView from 'react-native-infinite-scroll-view';
import NumberFormater from '../../components/numberFormatter';
import styles from './styles';
let moment = require('moment');
var GiftedListView = require('react-native-gifted-listview');
var GiftedSpinner = require('react-native-gifted-spinner');
import {Actions, ActionConst} from 'react-native-router-flux';
import {change_footer} from '../../actions/footerState';
import homeNavigation from '../home';
moment.locale('vi');

const glow2 = require('../../../images/glow2-new.png');


class CashOutHistoryComponent extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `NHẬN QUÀ`,
  });

  constructor(props, context) {
    super(props);
    this.dataSource = new ListView.DataSource({
      rowHasChanged: this._rowHasChanged.bind(this),
    });
    this.dataSource = this.getUpdatedDataSource(props);
  }

  componentWillMount() {
    if(!this.props.items.length){
      this._loadMoreContentAsync.call(this);
    }
  }

  _loadMoreContentAsync() {
    this.props.dispatch(fetchPosts({
      "command": "fetch_cash_out_log",
      "type": 0,
      "skip": this.props.items.length,
      "limit": 10
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


  _renderRowData(rowData) {
    if (!rowData) return;
    const {total, skip, isFetching, username} = this.props;
    const {orderId, createdTime, productName, productType, status, resultContent, code, serial, telco, isUsed} = rowData;
    var productNameArray = productName.match(/[^\r\n]+/g);
    var onlyProductName = productNameArray[0];
    var onlyProductPrice = productNameArray[1];

    let formatTime = moment(createdTime * 1000).format('h:mm a - D/M/YYYY');

    // Reload all data
    return (
      <View style={status == 2 ? styles.historyItemReject : styles.historyItem }>
        <View style={styles.historyHeader}>
          <View style={styles.historyLeft}>
            <Text style={styles.historyLeftTittle}>
              Thẻ {onlyProductName} {"\n"}
              <Text style={styles.historyLeftTime}> {createdTime}</Text>
            </Text>
          </View>
          <Text style={styles.historyRightTittle}>
            {onlyProductPrice} {"\n"}
          </Text>
        </View>
        {status == 0 && <View style={styles.historyContent}>
          <View style={styles.historyLeft}>
            <Text style={styles.historyItemField}>
              Seri : <Text style={styles.historyItemValue}> {serial}</Text>
            </Text>
            <Text style={styles.historyItemField}>
              Mã thẻ : <Text style={styles.historyItemValue}> {code}</Text>
            </Text>
          </View>
          <View style={[styles.historyRight, styles.historyRowButtonCopy]}>
            <Button style={styles.historyButtonCopy} onPress={() => this.copy(serial)}>
              <Text style={styles.historyButtonCopyText}>Copy Seri</Text>
            </Button>
            <Button style={styles.historyButtonCopy} onPress={() => this.copy(code)}>
              <Text style={styles.historyButtonCopyText}>Copy Mã</Text>
            </Button>
          </View>
        </View>}
        <View style={styles.historyBottom}>
          {isUsed == false &&
          <Button style={styles.historyButtonCopy} onPress={() => this.copyToCashIn.apply(this, [serial, code, telco])}>
            <Text style={styles.historyButtonCopyText}>Nạp thẻ</Text>
          </Button>}
          {status == 0 && <Text style={styles.historyRightOtherPaySuccess}> Đã nhận {isUsed}</Text>}
          {status == 2 && < Text style={styles.historyRightOtherPayReject}> Bị từ chối </Text>}
          {status == 1 && < Text style={styles.historyRightOtherPayWait}> Chờ duyệt ... </Text>}
        </View>
      </View>
    );
  }

  setError(message) {
    this.setState(prevState => ({
      errorMessage: message
    }));
  }

  _renderFooter() {
    return (
      <View style={styles.buttonFooterWrap}>
        <Button style={styles.buttonHistory} onPress={() => this._loadMoreContentAsync.call(this)}>
          <Text style={styles.buttonHistoryText}> Xem thêm </Text>
        </Button>
      </View>
    )
  }

  _renderHeader() {
    return (
      <View style={styles.buttonFooterWrap}>
        <Button style={styles.buttonHistory} onPress={() => this.props.dispatch(refreshListHistory())}>
          <Text style={styles.buttonHistoryText}> Làm mới </Text>
        </Button>
      </View>
    )
  }

  copy(code) {
    Clipboard.setString(code);
  }

  copyToCashIn(serial, code, telco) {
    this.props.dispatch(select_card_type({
      name: telco,
      code: telco.toLowerCase()
    }));
    this.props.dispatch(change_code(      code    ));
    this.props.dispatch(change_serial(      serial    ));
    this.props.dispatch(change_footer("cashIn"));
    this.props.dispatch(homeNavigation.router.getActionForPathAndParams("cashIn"));
  }

  render() {
    const {items, total, skip} = this.props;
    return (
      <Container style={{backgroundColor: '#2a3146'}}>
        {/*<HeaderWithBackComponent tittle="LỊCH SỬ CHUYỂN VÀNG"/>*/}
        <HeaderComponent/>
        <Image source={glow2} style={styles.container}>
          <View padder style={{backgroundColor: 'transparent'}}>
            <ListView
              renderScrollComponent={props => <InfiniteScrollView {...props} />}
              dataSource={this.dataSource}
              renderRow={(rowData) => this._renderRowData.call(this, rowData)}
              refreshControl={this._renderRefreshControl()}
              onLoadMoreAsync={this._loadMoreContentAsync.bind(this)}
              canLoadMore={false}
              enableEmptySections={true}
              pageSize={10}
              renderFooter={()=>this._renderFooter.call(this)}
              renderHeader={()=>this._renderHeader.call(this)}
            />

          </View>
        </Image>
        {/*<Footer style={{borderTopWidth: 0, backgroundColor: 'transparent'}}>*/}
          {/*<FooterComponent navigator={this.props.navigation}/>*/}
        {/*</Footer>*/}
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
  const {items, total, skip, isFetching} = state.cashOutHistory;
  const {loginInfo} = state.auth;
  return {
    items, total, skip, isFetching,
    username: loginInfo.username,
  };
};

export default connect(mapStateToProps)(CashOutHistoryComponent);
