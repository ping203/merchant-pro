const React = require('react-native');

const {StyleSheet, Dimensions, Platform} = React;

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
import theme from "../../themes/base-theme";

export default {
  headerContainer: {
    flex : 128 / 640,
    width: null,
    height: null,
    resizeMode: 'cover'
  },
  headerBg: {
    // width: deviceWidth,
    // height: deviceWidth * 128 / 640,
    // position: "absolute",
    // top: 0,
    // left: 0,
    // flex : deviceWidth/640,
    // flex : 0.2,
    // resizeMode: 'cover'
  },
  headerInner: {
    width: deviceWidth,
    height: deviceWidth * 128 / 640,
    position: "relative",
    flex: 1,
    // justifyContent: "space-between",
    justifyContent: "center",
    alignItems: 'center',
    flexDirection: 'row'
  },
  headerButtonLeftWrapper: {
    // position: "absolute",
    height: deviceWidth * 128 / 640,
    justifyContent: "center",
    // flex: 1,
    top : 0,
    left : 0,
  },
  headerButtonRightWrapper: {
    // position: "absolute",
    height: deviceWidth * 128 / 640,
    justifyContent: "center",
    top : 0,
    right : 0,
  },
  headerButtonLeft: {
    // backgroundColor : "red"
  },
  headerAvatar: {
    width: deviceWidth / 8,
    height: deviceWidth / 8
  },
  headerLeftWrapper: {
    height: deviceWidth / 8,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginRight: 15,
  },
  headerLeft: {
    width: deviceWidth * 0.27,
    height: deviceWidth / 8,
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  headerRight: {
    width: deviceWidth * 0.27,
    height: deviceWidth / 8,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 15,
  },
  roundedButton: {
    alignSelf: 'center',
    marginTop: 40,
    backgroundColor: '#00c497',
    borderRadius: 90,
    width: 65,
    height: 65,
    alignItems: 'center',
    justifyContent: 'center'
  }
  ,
  name: {
    color: 'red',
  }
  ,
  text: {
    marginBottom: 10,
    fontSize: 18,
  }
  ,
  closeIcon: {
    marginTop: (Platform.OS === 'ios') ? 2 : 2,
    color: '#ffffff',
    fontSize: (Platform.OS === 'ios') ? 35 : 25,
  }
  ,
  listitem: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#ddd',
  },
  bg: {
    left: 0,
    paddingTop: 0,
    height: null,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: (Platform.OS === 'ios') ? 50 : 50,
    position: "relative"
  },
  cardImage: {
    width : deviceWidth/3.5,
    height : deviceWidth/3.5 * 112/284,
    opacity : 0.2
  },
  cardImageActive: {
    width : deviceWidth/3.5,
    height : deviceWidth/3.5 * 112/284
  },
  cardWrappers : {
    // flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop : 10
  },
  buttonConfirm : {
    flexDirection: "row",
    justifyContent: "center",
    alignItems : "center",
    width : deviceWidth * 0.27,
    height : deviceWidth * 60/640,
    backgroundColor: "#cdac12",
  },
  headerBackButton : {
    position : "absolute",
    top : 25,
    left : 5
  },
  headerBackTitle : {
    color : "#7fa8d1",
    fontSize : theme.fontSizeH3,
    fontWeight : "bold"
  }
}
