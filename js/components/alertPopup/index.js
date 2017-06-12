import React, {Component} from 'react';
import {View, ScrollView} from 'react-native';

import Modal from 'react-native-modalbox';
import styles from './styles';

import {
  Button,
  Icon,
  Text
} from 'native-base';


class ConfirmComponent extends Component {

  constructor(props) {
    super(props);
  }

  open() {
    this.modal.open();
  }

  callback() {
    const {callback} = this.props;
    this.modal.close();
    if(typeof callback == "function"){
      callback();
    }
  }

  render() {
    const {message, callback, parent} = this.props;

    return (
      <Modal
        style={[styles.modal, styles.modal2]}
        backdrop={true}
        ref={(c) => {
          this.modal = c;
        }}
        swipeToClose={false}
      >
        <View  style={styles.header}>
          <Text style={{color : "#c4e1ff"}}>
            THÔNG BÁO
          </Text>
          <Button
            transparent
            style={{position: 'absolute', top: 0, right: 0}}
            onPress={()=>this.modal.close()}
          >
            <Icon name="close" style={{color: '#c4e1ff'}}/>
          </Button>
        </View>
        <ScrollView style={styles.space}>
          <Text style={styles.descriptionText}>
            {message}
          </Text>


        </ScrollView><View style={styles.modalButtonBar}>
        <Button rounded block style={styles.yellowButton}
                onPress={()=>this.callback.call(this)}>
          <Text style={styles.whiteButtonText}>
            Đồng ý
          </Text>
        </Button>
      </View>
      </Modal>
    );
  }
}

export default ConfirmComponent;
