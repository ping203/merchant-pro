
import { combineReducers } from 'redux';

import { reducer as dataReducer } from '../data/reducer';
import { reducer as servicesReducer } from '../services/reducer';
import drawer from './drawer';
import auth from './auth';
import footerState from './footerState';
import cashInScene from '../scenes/cashIn/reducers';
import confirmPopup from './confirmPopup';
import transferScene from '../scenes/transfer/reducers';
import historyTransfer from '../scenes/historyTransfer/reducers';


export default combineReducers({
  drawer,
  auth,
  footerState,
  cashInScene,
  confirmPopup,
  transferScene,
  historyTransfer,
  services: servicesReducer,
  data: dataReducer,
});
