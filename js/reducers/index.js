
import { combineReducers } from 'redux';

import { reducer as dataReducer } from '../data/reducer';
import { reducer as servicesReducer } from '../services/reducer';
import drawer from './drawer';
import auth from './auth';
import footerState from './footerState';
import cashInScene from '../components/cashIn/reducers';
import confirmPopup from './confirmPopup';
import tranferScene from '../components/tranfer/reducers';


export default combineReducers({
  drawer,
  auth,
  footerState,
  cashInScene,
  confirmPopup,
  tranferScene,
  services: servicesReducer,
  data: dataReducer,
});
