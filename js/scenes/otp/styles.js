const React = require('react-native');

const {StyleSheet, Dimensions, Platform} = React;

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
import theme from "../../themes/base-theme";

export default {
  container: {
    flex: 1,
    width: null,
    height: null
  },
  headerContainer: {
    width: deviceWidth,
    height: deviceWidth * 128 / 640,
    position: "relative"
  },
  headerBg: {
    width: deviceWidth,
    height: deviceWidth * 128 / 640,
    position: "absolute",
    top: 0,
    left: 0,
  },
  headerInner: {
    width: deviceWidth,
    height: deviceWidth * 128 / 640,
    position: "relative",
    flex: 1,
    justifyContent: "center",
    alignItems: 'center',
    flexDirection: 'row'
  },
  headerAvatar: {
    width: deviceWidth / 8,
    height: deviceWidth / 8
  },
  headerLeft: {
    width: deviceWidth * 0.27,
    height: deviceWidth / 8,
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-end",
    marginRight: 15
  },
  headerRight: {
    width: deviceWidth * 0.27,
    height: deviceWidth / 8,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 15
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
  newsListTittle: {
    fontSize : theme.fontSizeH2,
    color : "#c4e1ff",
    margin : 20,
    textAlign : "center",
    flex : 1,
  },
  bg: {
    marginTop : 10,
    left: 0,
    paddingTop: 0,
    height: null,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: (Platform.OS === 'ios') ? 50 : 50,
    // position: "relative",
    // zIndex : -1
  },
  innerView: {
    paddingLeft: deviceWidth / 16,
    paddingRight: deviceWidth / 16,
  },
  inputWrapper: {
    position: "relative",
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#464a60',
    borderRadius: 5,
    marginBottom: 10
  },
  loginInput: {
    textAlign: 'center',
    paddingRight: 50,
    paddingLeft: 50,
    color : "#585f73"
  },
  loginButton: {
    marginBottom: 10,
    marginTop: 10,
    height: 50,
    borderRadius: 10,
    backgroundColor: "#cdac12"
  },
  note: {
    color : "#585f73",
    flex : 1,
    textAlign : "center"
  },

}
