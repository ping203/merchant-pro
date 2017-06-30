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
  listitem: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#ddd',
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
  cardImage: {
    width : deviceWidth/3.5,
    height : deviceWidth/3.5 * 112/284,
    opacity : 0.2,
    backgroundColor: "white",
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
  errorMessage: {
    height: 30,
    color: 'red',
    marginBottom: (Platform.OS === 'ios') ? 10 : 0,
    marginTop: (Platform.OS === 'ios') ? 10 : 0,
    fontSize: theme.fontSizeBase * 0.8,
  },
  loginButton: {
    marginBottom: 10,
    height: 50,
    borderRadius: 10,
    backgroundColor: "#9f8a41"
  },
}
