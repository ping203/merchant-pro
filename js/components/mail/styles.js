
const React = require('react-native');
import { Platform } from 'react-native';
const { StyleSheet } = React;


export default{
  container: {
    width: null,
    height: null,
    flex: 1,
  },
  card: {
    borderWidth: 0,
    borderBottomWidth:0.5,
    borderBottomColor:'#9BA3A7',
  },
  cardHeader: {
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
    paddingBottom: 10,
    height: 65,
  },
  cardItem: {
    flexDirection: 'column',
    backgroundColor: 'transparent',
    paddingTop: 5,
    paddingLeft: 60,
    borderBottomWidth: (Platform.OS === 'ios') ? 0.5 : 1 ,
    borderBottomColor:'#9BA3A7',
  },
  listItem:{
      backgroundColor: 'transparent',
      height:40,
      borderBottomWidth:0,
  },
  date: {
    textAlign: 'right',
    fontSize: 13,
    fontWeight: '400',
    color: '#ddd',
  },
  attachment: {
    flexDirection: 'row',
    paddingTop: 5,
    paddingLeft: 5,

  },
  note: {

  },


}
