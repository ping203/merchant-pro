import { StyleSheet, Dimensions } from 'react-native';

const {width, height} = Dimensions.get('window');

export default{
  container: {
    flex: 1,
    width: null,
    height: null,
  },
  box: {
    padding: 10,
    backgroundColor: 'transparent',
    flex: 1,
    height: height - 70,
  },
  space: {
    marginTop: 10,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal1: {
    height: 300,
    marginTop:50,
  },
  modal2: {
    height: height - 78,
    position: 'relative',
    justifyContent: 'center',
  },
}
