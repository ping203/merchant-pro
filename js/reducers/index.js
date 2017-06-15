
import { combineReducers } from 'redux';
import { reducer as dataReducer } from '../data/reducer';
import { reducer as servicesReducer } from '../services/reducer';
import { reducer as formReducer } from 'redux-form';
import auth from './auth';
import nav from './nav';
import appNavigation from './appNavigation';
import confirmPopup from './confirmPopup';
import cashOutHistory from '../scenes/cashOutHistory/reducers';

export default combineReducers({
  nav,
  appNavigation,
  auth,
  confirmPopup,
  cashOutHistory,
  form: formReducer,
  services: servicesReducer,
  data: dataReducer,
});
