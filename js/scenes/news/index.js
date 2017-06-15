import React, {Component} from 'react';
import {Image, Platform, AsyncStorage, TouchableHighlight, View, Alert, ListView, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  List,
  ListItem,
  Text,
  Footer,
  Left,
  Right,
  Body,
  Item,
  Input
} from 'native-base';
import HeaderComponent from '../../components/header/index';
import ConfirmComponent from '../../components/confirmPopup/index';
import styles from './styles';
import modalStyles from '../../components/styles/modal';
import Modal from 'react-native-modalbox';

const glow2 = require('../../../images/glow2-new.png');
const newsData = [{
  tittle: 'Ra mắt ứng dụng Plus',
  time: '13/06/17',
  paragraphs: ["Để bảo mật tài khoản cho người dùng tốt hơn, chúng tôi đã cho ra mắt ứng dụng Plus, hỗ trợ bảo mật bằng thiết bị di động.",
    "Các tính năng nhạy cảm như chuyển vàng, thay đổi thông tin tài khoản, xóa nhân vật cần phải nhập mã OTP.",
    "Các tài khoản cần phải xác thực bằng SĐT trước khi sử dụng các tính năng của ứng dụng.",
    "Để đảm bảo an toàn cho tài khoản của các bạn. Chúng tôi khuyến cáo các bạn xác thực và sử dụng tính năng OTP",
    "Cảm ơn các bạn!"]
}, {
  tittle: 'Tính năng OTP',
  time: '11/06/17',
  paragraphs: ["Tính năng OTP là tính năng tương tự các ngân hàng sử dụng để bảo mật. ",
    "Các bạn sẽ phải nhập mã OTP khi thay đổi thông tin tài khoản, chuyển vàng, tạo/xóa nhân vật.",
    "Mã OTP đổi mới sau 30s và chỉ hiển thị trên thiết bị di động của bạn."]
}, {
  tittle: 'Xác thực tài khoản',
  time: '11/06/17',
  paragraphs: ["Để đảm bảo an toàn cho các bạn, kể từ 10/6, mọi giao dịch chuyển vàng, tạo/xóa nhân vật, thay đổi thông tin tài khoản sẽ yêu cầu phải xác thực tài khoản và nhập mã OTP. ",
    "Các xác thực tài khoản: ",
    "   - Đăng nhập vào tài khoản của bạn trên hệ thống hoặc trên ứng dụng.",
    "   - Chọn xác thực tài khoản",
    "   - Soạn tin nhắn theo nội dung hướng dẫn và gửi tới 9029.",
    "",
    "Chú ý: Chỉ hỗ trợ các SĐT tại Việt Nam của 3 nhà mạng Vina, Mobi và Viettel. Các bạn sử dụng mạng khác hoặc ở nước ngoài vui lòng nhờ người nhà ở VN đăng ký."]
}]

class News extends Component {

  static navigationOptions = ({navigation}) => ({
    title: `TIN TỨC`,
  });

  constructor(props) {
    super(props);
    this.state = {
      newsItem : {
        paragraphs : []
      }
    };
  }

  showPopup(newItem) {
    this.setState({
      newsItem : newItem
    })
    this.modal.open();
  }


  render() {
    const {isActived} = this.props;
    const {tittle, time, paragraphs} = this.state.newsItem;
    const _self = this;

    return (

      <Container style={{backgroundColor: '#2a3146'}}>
        <HeaderComponent/>
        <Image source={glow2} style={styles.container}>
          <Content padder style={{backgroundColor: 'transparent'}}>
            <Text style={styles.newsListTittle} >TIN TỨC</Text>
            <View style={styles.bg}>
              <View style={styles.innerView}>
                {newsData.map((item, index) => {
                  return (<View style={styles.listitem} key={item.tittle}>
                    <Text style={styles.listitemTittle} onPress={() => _self.showPopup(item)}>
                      {item.tittle}
                    </Text>
                    <Text style={styles.listitemTime} >
                      {item.time}
                    </Text>
                  </View>)
                })}
              </View>
            </View>

          </Content>


          {!isActived && <ConfirmComponent ></ConfirmComponent>}
        </Image>

        <Modal
          style={[modalStyles.modal, modalStyles.modal2]}
          backdrop={true}
          ref={(c) => {
            this.modal = c;
          }}
          swipeToClose={false}
          isOpen={false}
        >
          <View  style={[modalStyles.header, styles.modalHeader]}>
            <Text style={{color : "#c4e1ff"}} numberOfLines={1} >
              {tittle}
            </Text>
            <Button
              transparent
              style={{position: 'absolute', top: 0, right: 0}}
              onPress={()=>this.modal.close()}
            >
              <Icon name="close" style={{color: '#c4e1ff'}}/>
            </Button>
          </View>
          <ScrollView style={modalStyles.space}>
            {paragraphs.map((item,index)=>(
              <Text key={index}>
                {item}
              </Text>))}
          </ScrollView>
        </Modal>
      </Container>
    );
  }
}


const mapStateToProps = state => {
  const {loginInfo} = state.auth;
  return {
    isActived: loginInfo.isTelephoneVerified,
  }
};

export default connect(mapStateToProps)(News);
