import React, {Component} from 'react';
import {Image, View, ListView, RefreshControl} from 'react-native';
import {connect} from 'react-redux';
import {
  Container,
  Content,
  Text,
} from 'native-base';

import {fetchPosts} from './actions';
import HeaderWithBackComponent from './../header/headerWithBack';
import InfiniteScrollView from 'react-native-infinite-scroll-view';
import styles from './styles';

const glow2 = require('../../../images/glow2-new.png');


class HistoryTransferComponent extends Component {
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
      "command": "fetch_transfer_log",
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
    if(!rowData) return;
    const { total, skip, isFetching, username} = this.props;
    const { toUsername, userPayFee, fee, transfer} = rowData;
    console.log("_renderRowData",rowData);
    console.log("items, total, skip, isFetching, username", total, skip, isFetching, username);

    // Reload all data
    return (
      <View style={styles.historyItem}>
        <View style={styles.historyLeft}>
          <Text> Left</Text>
        </View>
        <View style={styles.historyRight}>

          <Text> Right</Text>
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
    console.log("render items", items[0]);
    return (
      <Container style={{backgroundColor: '#2a3146'}}>
        <HeaderWithBackComponent tittle="LỊCH SỬ CHUYỂN VÀNG"/>
        <Image source={glow2} style={styles.container}>
          <Content padder style={{backgroundColor: 'transparent'}}>
            <ListView
              renderScrollComponent={props => <InfiniteScrollView {...props} />}
              dataSource={this.dataSource}
              renderRow={(rowData) => this._renderRowData.call(this, rowData)}
              refreshControl={this._renderRefreshControl()}
              onLoadMoreAsync={this._loadMoreContentAsync.bind(this)}
              canLoadMore={!items.length || items.length < total}
              enableEmptySections={true}
            />
            <View style={styles.bg}>
              <View style={styles.innerView}>
              </View>
            </View>

          </Content>
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
  const {items, total, skip, isFetching} = state.historyTransfer;
  const {loginInfo} = state.auth;
  return {
    items, total, skip, isFetching,
    username: loginInfo.username,
  };
};

export default connect(mapStateToProps)(HistoryTransferComponent);
