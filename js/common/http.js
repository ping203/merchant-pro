/**
 * Created by Admin on 5/4/2017.
 */

import axios from 'axios';
import config from './appConfig';


export default {
  post : function (url,params) {
    var postConfig = {
      headers: {'X-Requested-With': 'XMLHttpRequest'}
    };
    Object.assign(params,{
      platformId : config.platformId,
      imei : config.imei,
      version : config.version,
      bundleId : config.bundleId
    });
    var request = axios.post(config.host + url, params, postConfig);
    return request;
  }
};

