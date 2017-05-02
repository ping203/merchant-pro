
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, Icon, List, ListItem, Content, Left, Body, Right, Thumbnail, Badge } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { closeDrawer } from '../../actions/drawer';
import styles from './style';

const logo = require('../../../images/icon2.png');

class SideBar extends Component {


  render() {
    return (
      <Content style={{ backgroundColor: '#252A30' }} >
        <Thumbnail
          style={{ alignSelf: 'center', height: 200, width: 200, marginTop: 20, marginBottom: 15, resizeMode: 'contain' }}
          square
          source={logo}
        />

        <ListItem button onPress={() => { Actions.home(); this.props.closeDrawer(); }} icon style={styles.links} >
          <Left>
            <Icon name="home" />
          </Left>
          <Body>
            <Text >Home</Text>
          </Body>
          <Right />
        </ListItem>
        <ListItem button onPress={() => { Actions.inbox(); this.props.closeDrawer(); }} icon style={styles.links} >
          <Left>
            <Icon active name="mail-open" />
          </Left>
          <Body>
            <Text>Inbox</Text>
          </Body>
          <Right>
            <Badge style={{ marginBottom: 8 }}><Text>2</Text></Badge>
          </Right>
        </ListItem>
        <ListItem button onPress={() => { Actions.mail(); this.props.closeDrawer(); }} icon style={styles.links} >
          <Left>
            <Icon active name="paper" />
          </Left>
          <Body>
            <Text>Mail</Text>
          </Body>
          <Right />
        </ListItem>
        <ListItem button onPress={() => { Actions.compose(); this.props.closeDrawer(); }} icon style={styles.links} >
          <Left>
            <Icon name="paper-plane" />
          </Left>
          <Body>
            <Text>Compose</Text>
          </Body>
          <Right />
        </ListItem>
        <ListItem button onPress={() => { Actions.lists(); this.props.closeDrawer(); }} icon style={styles.links} >
          <Left>
            <Icon name="list-box" />
          </Left>
          <Body>
            <Text>List</Text>
          </Body>
          <Right />
        </ListItem>
        <ListItem button onPress={() => { Actions.icons(); this.props.closeDrawer(); }} icon style={styles.links} >
          <Left>
            <Icon name="planet" />
          </Left>
          <Body>
            <Text>Icons</Text>
          </Body>
          <Right />
        </ListItem>
        <ListItem button onPress={() => { Actions.progressBar(); this.props.closeDrawer(); }} icon style={styles.links} >
          <Left>
            <Icon name="finger-print" />
          </Left>
          <Body>
            <Text>ProgressBar</Text>
          </Body>
          <Right />
        </ListItem>
        <ListItem button onPress={() => { Actions.spinners(); this.props.closeDrawer(); }} icon style={styles.links} >
          <Left>
            <Icon name="jet" />
          </Left>
          <Body>
            <Text>Spinner</Text>
          </Body>
          <Right />
        </ListItem>
        <ListItem button onPress={() => { Actions.form(); this.props.closeDrawer(); }} icon style={styles.links}>
          <Left>
            <Icon name="aperture" />
          </Left>
          <Body>
            <Text>Form</Text>
          </Body>
          <Right />
        </ListItem>
        <ListItem button onPress={() => { Actions.modal(); this.props.closeDrawer(); }} icon style={styles.links}>
          <Left>
            <Icon name="alert" />
          </Left>
          <Body>
            <Text>Modal</Text>
          </Body>
          <Right />
        </ListItem>
      </Content>
    );
  }
}

function bindAction(dispatch) {
  return {
    closeDrawer: () => dispatch(closeDrawer()),
  };
}

const mapStateToProps = state => ({
  });

export default connect(mapStateToProps, bindAction)(SideBar);
