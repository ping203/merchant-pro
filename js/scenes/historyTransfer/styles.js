import theme from "../../themes/base-theme";

const React = require('react-native');

const {StyleSheet, Dimensions, Platform} = React;

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
  container: {
    flex: 1,
    width: null,
    height: null,
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
    marginTop: 10,
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
    width: deviceWidth / 3.5,
    height: deviceWidth / 3.5 * 112 / 284,
    opacity: 0.2
  },
  cardImageActive: {
    width: deviceWidth / 3.5,
    height: deviceWidth / 3.5 * 112 / 284
  },
  cardWrappers: {
    // flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10
  },
  checkboxList: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10
  },
  errorMessage: {
    height: 30,
    color: 'red',
    marginBottom: (Platform.OS === 'ios') ? 10 : 0,
    marginTop: (Platform.OS === 'ios') ? 10 : 0,
    fontSize: theme.fontSizeBase * 0.8,
  },
  innerView: {
    paddingLeft: deviceWidth / 8,
    paddingRight: deviceWidth / 8,
  },
  radioContainer: {
    paddingLeft: deviceWidth / 30,
    paddingRight: deviceWidth / 30,
  },
  centerBox: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 10
  },
  buttonHistory: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    width: deviceWidth * 240 / 640,
    borderWidth: 2,
    borderColor: '#1182b1',
    borderRadius: 5,
    backgroundColor: "rgba(0, 255, 234, 0.05)"
  },
  buttonHistoryText: {
    fontSize: theme.fontSizeBase * 1.1,
    color: "#676da6",
    fontWeight: "bold"
  },
  buttonFooterWrap: {

    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    margin: 10,
  },

  buttonYellow: {
    marginTop: 10,
    marginBottom: 10,
    height: 50,
    borderRadius: 10,
    backgroundColor: "#cdac12"
  },
  isVerifyReceiver: {
    width: 30,
    color: "#add329",
    position: "absolute",
    top: 12,
    right: 5,
  },
  historyItem: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    borderRadius: 3,
    backgroundColor: "white",
    justifyContent: "space-between",
    flex: 1,
    flexDirection: "row",
    padding: 10
  },
  historyLeft: {
    alignItems: "flex-start",
    maxWidth: 0.5 * deviceWidth - 5
  },
  historyLeftTittle: {
    color: '#7b93cb',
    fontSize: 17,
    fontWeight: "bold"
  },
  historyLeftTime: {
    color: '#5a6490',
    fontSize: 13,
    marginTop: 5
  },
  historyRight: {
    alignItems: "flex-end",
    maxWidth: 0.5 * deviceWidth - 20,
    backgroundColor : "transparent"
  },
  historyRightTittleReceive: {
    color: '#ffde00',
    fontSize: 17,
    fontWeight: "bold"
  },
  historyRightTittleSend: {
    color: '#fe9870',
    fontSize: 17,
    fontWeight: "bold"
  },
  historyRightMinePay: {
    color: '#b07a7a',
    fontSize: 13,
  },
  historyRightOtherPay: {
    color: '#9fc55d',
    fontSize: 13,
  },
}
