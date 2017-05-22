

const React = require('react-native');

const { StyleSheet, Dimensions } = React;

const {width, height} = Dimensions.get('window');

export default {
  footer: {
    // flex: 1,
    width,
    flexDirection: 'row',
    height: 55,
    borderWidth: 0,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#434973',
  },
  activeButton: {
    backgroundColor: "#3a3f6c",
    paddingLeft : 0,
    paddingRight : 0,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    paddingLeft : 0,
    paddingRight : 0,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bigblue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  red: {
    color: 'red',
  }
}
