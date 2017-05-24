import React, {Component} from 'react';
import {Image, View, ListView, RefreshControl} from 'react-native';
import {connect} from 'react-redux';
import {
  Container,
  Content,
  Text,
} from 'native-base';

import {fetchPosts} from './actions';
import HeaderComponent from '../../components/header/index';
import InfiniteScrollView from 'react-native-infinite-scroll-view';
import NumberFormater from '../../components/numberFormatter';
import styles from './styles';
let moment = require('moment');
moment.locale('vi');

const glow2 = require('../../../images/glow2-new.png');


class MerchantsComponent extends Component {
  constructor(props, context) {
    super(props);
    this.dataSource = new ListView.DataSource({
      rowHasChanged: this._rowHasChanged.bind(this),
    });
    this.dataSource = this.getUpdatedDataSource(props);
  }

  componentWillMount() {
    this._loadMoreContentAsync.call(this);
  }

  _loadMoreContentAsync() {
    this.props.dispatch(fetchPosts({
      "command": "fetch_list_merchant",
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
    if(!rowData) return;
    const { total, skip, isFetching, username} = this.props;
    const { toUsername, userPayFee, fee, createdTime,transferType, value,fromUsername} = rowData;
    let transferTypeCode = (toUsername == username );// true : nhận, false : chuyển;
    let transferPayFeeType = (userPayFee == username ); //true : "Bạn";// false : chuyển;
    let formatTime =  moment(createdTime*1000).format('h:mm a - D/M/YYYY');

    // Reload all data
    return (
      <View style={styles.historyItem}>
        <View style={styles.historyLeft}>
          {transferTypeCode && <Text style={styles.historyLeftTittle}>
            Nhận từ {fromUsername} {"\n"}
          </Text>}
          {transferTypeCode && <Text style={styles.historyLeftTime}> {formatTime}</Text>}
          {!transferTypeCode && <Text style={styles.historyLeftTittle}>
            Chuyển cho {toUsername} {"\n"}
          </Text>}
          {!transferTypeCode && <Text style={styles.historyLeftTime}> {formatTime}</Text>}
        </View>
        <View style={styles.historyRight}>
          {transferTypeCode && <Text style={styles.historyRightTittleReceive}>
            + <NumberFormater format="0,0" style={styles.historyRightTittleReceive}>{value}</NumberFormater> V {"\n"}
          </Text>}
          {!transferTypeCode && <Text style={styles.historyRightTittleSend}>
            - <NumberFormater format="0,0" style={styles.historyRightTittleSend}>{value}</NumberFormater> V {"\n"}
          </Text>}
          {transferPayFeeType && <Text style={styles.historyRightMinePay}>
            Bạn chịu phí
          </Text>}
          {!transferPayFeeType && <Text style={styles.historyRightOtherPay}>
            {userPayFee} chịu phí
          </Text>}
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
    const {items, total, skip} = this.props;
    // console.log("!items.length || items.length < total",!items.length, items.length < total,!items.length || items.length < total)
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


            {/*<ListView*/}
              {/*dataSource={this.dataSource}*/}
              {/*renderRow={(rowData) => this._renderRowData.call(this, rowData)}*/}
              {/*enableEmptySections={true}*/}
            {/*/>*/}

          </View>
        </Image>
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
  const {items, total, skip, isFetching} = state.merchants;
  const {loginInfo} = state.auth;
  return {
    items, total, skip, isFetching,
    username: loginInfo.username,
  };
};

export default connect(mapStateToProps)(MerchantsComponent);
