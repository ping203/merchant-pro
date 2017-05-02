

const React = require('react-native');

const { StyleSheet, Dimensions } = React;

const width = Dimensions.get('window').width;

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
    backgroundColor: '#616D74',
  },

}
