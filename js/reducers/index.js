
import { combineReducers } from 'redux';

import drawer from './drawer';
import auth from './auth';


export default combineReducers({
  drawer,
  auth
});
