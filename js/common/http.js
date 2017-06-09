/**
 * Created by Admin on 5/4/2017.
 */

import axios ,{CancelToken }from 'axios';
import config from './appConfig';
import store from '../configureStore';

export default {
  post : function (url,params, postConfig = {}) {
    Object.assign(postConfig,{
      headers: {'X-Requested-With': 'XMLHttpRequest'}
    });
    var mappingParams = Object.assign({
      platformId : config.platformId,
      imei : config.imei,
      version : config.version,
      bundleId : config.bundleId
    },params);
    console.log("params",params);
    var request = axios.post(config.host + url, mappingParams, postConfig);
    return request;
  },
  post2 : function (url,params, postConfig = {}) {
    var storeData = store.getState();
    var accessToken = "";
    if(storeData.auth && storeData.auth.loginInfo && storeData.auth.loginInfo && storeData.auth.loginInfo.accessToken){
      accessToken = storeData.auth.loginInfo.accessToken;
    };
    Object.assign(postConfig,{
      headers: {'X-Requested-With': 'XMLHttpRequest'}
    });
    // var postConfig = {
    //   headers: {'X-Requested-With': 'XMLHttpRequest'},
    //   // Authorization : accessToken
    // };
    Object.assign(params,{
      platformId : config.platformId,
      imei : config.imei,
      version : config.version,
      bundleId : config.bundleId,
      Authorization : accessToken
    });
    var request = axios.post(config.host + url, params, postConfig);
    return request;
  },
  postWithConvert : function (url,params, postConfig = {}) {
    return this.post2(url,params, postConfig).then(this.convertData);
  },
  convertData : function(dataResponse){
    var data = dataResponse.data && dataResponse.data;
    if(typeof data.status === "undefined"){
      throw "Server error !";
    }else return data;
  }
};

