/**
 * Created by Admin on 5/4/2017.
 */
const React = require('react-native');

const {Platform} = React;
export default{
  // host : "http://dev3.puppetserver.com/wap",
  // host : "http://uat1.puppetserver.com/wap",
  host : "https://vuabaivip.com/wap",
  // bundleId : "com.songbaivip.fullhd",
  bundleId : "com.gamebaivip2017.danhbaidoithuong",
  platformId : Platform.OS === 'ios' ? 1 : 2,
  imei: "4755711c-640d-786d-8397-c37a8c47d683",
  version : "1.0.0"
};
