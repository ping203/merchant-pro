
import { combineReducers } from 'redux';

import { reducer as dataReducer } from '../data/reducer';
import { reducer as servicesReducer } from '../services/reducer';
import drawer from './drawer';
import auth from './auth';


export default combineReducers({
  drawer,
  auth,
  services: servicesReducer,
  data: dataReducer,
});
