/**
 * Created by Admin on 5/24/2017.
 */
import React ,{Component} from 'react';
import {reduxForm, Field} from 'redux-form';
import {ScrollView, View} from 'react-native';
import {Input, Button, Text}  from 'native-base';
import styles from './styles';
import hocInput from './hocInput';

const validate = values => {
  const error= {};
  return {};
  error.merchantName= '';
  error.name= '';
  var merchantName = values.merchantName;
  if(values.merchantName === undefined){
    merchantName = '';
  }
  if(merchantName.length < 8 && merchantName !== ''){
    error.merchantName= 'too short';
  }
  return error;
};

class TransferMerchantForm extends Component {
  constructor(props){
    super(props);
    this.state={
      isReady: false
    };
    console.log("constructor .props", props);
  }

  closeModal(){

  }

  submit(){

  }

  render(){
    console.log("render .props", this.props);
    return (
      <ScrollView keyboardShouldPersistTaps={'handled'}>
        <Field
          name={'merchantName'}
          component={hocInput}
          placeholder="Mã đại lý"
          disabled="true"
          keyboardType="numeric"
          placeholderTextColor="#7481a7"
        />
        <Field
          name={'value'}
          component={hocInput}
          placeholder="Số vàng"
          keyboardType="numeric"
          placeholderTextColor="#7481a7"
        />
        <Field
          name={'fee'}
          component={hocInput}
          placeholder="Phí"
          disabled="true"
          keyboardType="numeric"
          placeholderTextColor="#7481a7"
        />
        <Field
          name={'description'}
          component={hocInput}
          placeholder="Nội dung chuyển tiền"
          keyboardType="numeric"
          placeholderTextColor="#7481a7"
        />
        <View style={styles.modalButtonBar}>
          <Button rounded block style={styles.whiteButton}
                  onPress={this.props.closeModal.bind(this.props.parent)}>
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
    );
  }
}

// export default reduxForm({form: 'transferMerchantForm', validate})(TransferMerchantForm);
export default reduxForm({form: 'transferMerchantForm'})(TransferMerchantForm);