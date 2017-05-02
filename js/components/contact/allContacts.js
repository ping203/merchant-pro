
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Content, Text, List, ListItem, Thumbnail,Left, Body } from 'native-base';

const sanket = require('../../../images/contacts/sanket.png');
const pratik = require('../../../images/contacts/pratik.png');
const varun = require('../../../images/contacts/varun.png');
const megha = require('../../../images/contacts/megha.png');
const atul = require('../../../images/contacts/atul.png');
const saurav = require('../../../images/contacts/saurav.png');
const sankha = require('../../../images/contacts/sankha.png');

class AllContacts extends Component { // eslint-disable-line react/prefer-stateless-function

  render() { // eslint-disable-line  class-methods-use-this
    return (
      <Content style={{ backgroundColor: 'transparent' }}>
        <List>
          <ListItem>
            <Left>
              <Thumbnail
                circular style={{ width: 36, height: 36, borderRadius: 18 }}
                size={50} source={sanket}
              />
              <Body>
                <Text>Kumar Sanket</Text>
                <Text note>8861522489</Text>
              </Body>
            </Left>
          </ListItem>
          <ListItem>
            <Left>
              <Thumbnail
                circular style={{ width: 36, height: 36, borderRadius: 18 }}
                size={50} source={pratik}
              />
              <Body>
                <Text>Kumar Pratik</Text>
                <Text note>8861522489</Text>
              </Body>
            </Left>
          </ListItem>
          <ListItem>
            <Left>
              <Thumbnail
                circular style={{ width: 36, height: 36, borderRadius: 18 }}
                size={50} source={megha}
              />
              <Body>
                <Text>Megha Kumari</Text>
                <Text note>8861522489</Text>
              </Body>
            </Left>
          </ListItem>
          <ListItem>
            <Left>
              <Thumbnail
                circular style={{ width: 36, height: 36, borderRadius: 18 }}
                size={50} source={varun}
              />
              <Body>
                <Text>Varun Sahu</Text>
                <Text note>8861522489</Text>
              </Body>
            </Left>
          </ListItem>
          <ListItem>
            <Left>
              <Thumbnail
                circular style={{ width: 36, height: 36, borderRadius: 18 }}
                size={50} source={atul}
              />
              <Body>
                <Text>Atul Ranjan</Text>
                <Text note>8861522489</Text>
              </Body>
            </Left>
          </ListItem>
          <ListItem>
            <Left>
              <Thumbnail
                circular style={{ width: 36, height: 36, borderRadius: 18 }}
                size={50} source={saurav}
              />
              <Body>
                <Text>Saurabh Sahu</Text>
                <Text note>8861522489</Text>
              </Body>
            </Left>
          </ListItem>
          <ListItem>
            <Left>
              <Thumbnail
                circular style={{ width: 36, height: 36, borderRadius: 18 }}
                size={50} source={sankha}
              />
              <Body>
                <Text>Sankhadeep Roy</Text>
                <Text note>8861522489</Text>
              </Body>
            </Left>
          </ListItem>
        </List>
      </Content>
    );
  }
}

export default connect(null)(AllContacts);
