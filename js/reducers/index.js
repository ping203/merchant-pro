
import { combineReducers } from 'redux';

import { reducer as dataReducer } from '../data/reducer';
import { reducer as servicesReducer } from '../services/reducer';
import drawer from './drawer';
import auth from './auth';
import footerState from './footerState';


export default combineReducers({
  drawer,
  auth,
  footerState,
  services: servicesReducer,
  data: dataReducer,

});
