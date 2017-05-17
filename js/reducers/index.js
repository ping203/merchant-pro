
import { combineReducers } from 'redux';

import { reducer as dataReducer } from '../data/reducer';
import { reducer as servicesReducer } from '../services/reducer';
import drawer from './drawer';
import auth from './auth';
import footerState from './footerState';
import cashInScenes from '../components/cashIn/reducers';


export default combineReducers({
  drawer,
  auth,
  footerState,
  cashInScenes,
  services: servicesReducer,
  data: dataReducer,

});
