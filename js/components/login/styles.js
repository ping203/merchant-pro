
const React = require('react-native');

const { StyleSheet, Dimensions, Platform } = React;

const deviceHeight = Dimensions.get('window').height;

export default{
  container: {
    flex: 1,
    width: null,
    height: null,
  },
  shadow: {
    flex: 1,
    marginTop: (deviceHeight < 600) ? -40 : -10,
    width: null,
    height: null,
    backgroundColor: 'transparent',
  },
  bg: {
    flex: 1,
    marginTop: (deviceHeight / 2) - 15,
    backgroundColor: '#00c497',
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: (Platform.OS === 'ios') ? 50 : 50,
  },
};
