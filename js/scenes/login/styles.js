const React = require('react-native');

const {StyleSheet, Dimensions, Platform} = React;
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const logoRatio = 220 / 409;
const facebookButtonWidth = 80;
import theme from "../../themes/base-theme";

export default{
  container: {
    flex: 1,
    width: deviceWidth,
    height: deviceHeight
  },
  shadow: {
    flex: 1,
    marginTop: (deviceHeight < 600) ? -40 : -10,
    width: null,
    height: null,
    // backgroundColor: 'transparent',
    backgroundColor: 'red',
  },
  bg: {
    left: 0,
    paddingTop: deviceHeight / 3,
    height: null,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: (Platform.OS === 'ios') ? 50 : 50,
    position: "relative"
  },
  logo: {
    left: deviceWidth * 0.25,
    top: deviceHeight * 0.14,
    position: "absolute",
    width: 0.5 * deviceWidth,
    height: 0.5 * deviceWidth * logoRatio,
    backgroundColor: 'transparent',
    overflow: "visible"
  },
  inputWrapper: {
    position: "relative",
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#585f73',
    borderRadius: 5,
    marginBottom: 10
  },
  inputStyle: {
    textAlign: 'center',
    paddingRight: 20,
    paddingLeft: 20,
    color : "#585f73"
  },
  inputIcon: {
    position: "absolute",
    top: 10,
    left: 20,
    color: "#309dc5"
  },
  loginInput: {
    textAlign: 'center',
    paddingRight: 50,
    paddingLeft: 50,
    color : "#b6e4ff"
  },
  loginButton: {
    marginBottom: 10,
    height: 50,
    borderRadius: 10,
    backgroundColor: "#cdac12"
  },
  innerView: {
    paddingLeft: deviceWidth / 8,
    paddingRight: deviceWidth / 8,
  },
  facebookWrapper: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    marginTop: 30,
  },
  facebookButton: {
    width: deviceWidth / 8,
    height: deviceWidth / 8,
  },
  errorMessage: {
    height: 30,
    color: 'red',
    marginBottom: (Platform.OS === 'ios') ? 10 : 0,
    marginTop: (Platform.OS === 'ios') ? 10 : 0,
    fontSize: theme.fontSizeBase * 0.8,
  },
  loginText: {
    color : "#309dc5",
    fontSize : theme.fontSizeBase * 1.1,
    fontWeight : "bold",
    textAlign : "center"
  },
}
