import { Platform } from 'react-native';
import _ from 'lodash';

import variable from './../variables/platform';

export default (variables = variable) => {
  const platformStyle = variables.platformStyle;
  const platform = variables.platform;

  const tabHeadingTheme = {
    flexDirection: 'row',
    backgroundColor: '#00c497',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    'NativeBase.Text': {
      color: '#fff',
      marginHorizontal: 7
    },
    'NativeBase.Icon': {
      color: variables.topTabBarTextColor,
      fontSize: (platform==='ios') ? 26 : undefined
    },
    '.active': {
      'NativeBase.Text': {
        color: variables.topTabBarActiveTextColor,
        fontWeight: '600'
      },
      'NativeBase.Icon': {
        color: variables.topTabBarActiveTextColor
      },
    }
  };


  return tabHeadingTheme;
};
