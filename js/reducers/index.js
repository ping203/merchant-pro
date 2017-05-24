
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
import mobileCards from '../scenes/mobileCards/reducers';
import itemsCashOut from '../scenes/itemsCashOut/reducers';
import merchants from '../scenes/merchants/reducers';
import cashOutHistory from '../scenes/cashOutHistory/reducers';

export default combineReducers({
  drawer,
  auth,
  footerState,
  cashInScene,
  confirmPopup,
  transferScene,
  historyTransfer,
  mobileCards,
  itemsCashOut,
  merchants,
  cashOutHistory,
  services: servicesReducer,
  data: dataReducer,
});
