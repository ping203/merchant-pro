const React = require('react-native');
import theme from "../../themes/base-theme"

const {StyleSheet, Dimensions, Platform} = React;

const {width, height} = Dimensions.get('window');

export default {
  modal: {
    position: "relative",
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  },
  modal1: {
    height: 300,
    marginTop: 50,
  },
  modal2: {
    width: width * 7 / 8,
    height: height * 0.55,
    position: 'relative',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: "#3a3e53",
  },
  header: {
    position: "absolute",
    height: height * 70 / 1136,
    backgroundColor: "#46649d",
    width: width * 7 / 8,
    top: 0,
    left: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  },
  headerText: {
    color: "#c4e1ff",
    fontSize: theme.fontSizeH2
  },
  space: {
    padding: 10,
  },
  descriptionText: {
    color: "#fff",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center"
  },
  checkboxList: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10
  },
  buttonWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10
  },
  yellowButton: {
    marginBottom: 10,
    height: 50,
    borderRadius: 10,
    backgroundColor: "#cdac12",
    width : width * 0.6,
    marginTop: 10,
  },
  yellowButtonText: {
    color: '#ffffff',
    fontWeight: "bold",
    fontSize: theme.fontSizeH2
  },
  messageContainer: {
    justifyContent: "center",
    alignItems: "center"
  }
  ,
  messageContent: {
    textAlign: "center"
  }
  ,
  sendText: {
    color: "#c4e1ff",
    fontSize: theme.fontSizeBase
  }
  ,
  messageYellow: {
    color: "#cdac12",
    fontSize: theme.fontSizeBase * 1.2
  }
}
