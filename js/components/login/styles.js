const React = require('react-native');

const {StyleSheet, Dimensions, Platform} = React;

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const logoRatio = 161 / 383;
const facebookButtonWidth = 80;

export default{
  container: {
    flex: 1,
    width: deviceWidth,
    height: null
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
    paddingTop: deviceHeight / 2 - 50,
    height: null,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: (Platform.OS === 'ios') ? 50 : 50,
    position: "relative"
  },
  logo: {
    left: deviceWidth / 5,
    top: deviceHeight / 6,
    position: "absolute",
    width: 3 * deviceWidth / 5,
    height: 3 * deviceWidth / 5 * logoRatio,
    backgroundColor: 'transparent',
    overflow: "visible"
  },
  inputWrapper: {
    position: "relative",
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#222',
    borderRadius: 5,
    marginBottom: 15
  },
  inputIcon: {
    position: "absolute",
    top: 10,
    left: 20,
    color: "#7481a7"
  },
  loginButton: {
    marginBottom: 10,
    height: 60,
    borderRadius: 10,
    backgroundColor: "#cdac12"
  },
  innerView: {
    paddingLeft: deviceWidth / 8,
    paddingRight: deviceWidth / 8,
  },
  facebookWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    marginTop : 30,
  },
  facebookButton: {
    width: deviceWidth / 8,
    height: deviceWidth / 8,
  }
}
;