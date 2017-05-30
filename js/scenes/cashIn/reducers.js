import {combineReducers} from 'redux';
import {SELECT_CARD_TYPE, CHANGE_CODE, CHANGE_SERIAL, UPDATE_CONFIG_RATIO} from './actions';


const initialCardType = {
  name: "Mobifone",
  code: "vtt"
};

function selectedCardType(state = initialCardType, action) {
  if (action.type === SELECT_CARD_TYPE) {
    return {
      name: action.cardType.name,
      code: action.cardType.code
    };
  }
  return state;
}

function changeCode(state = null, action) {
  if (action.type === CHANGE_CODE) {
    return action.code;
  }
  return state;
}

function changeSerial(state = null, action) {
  if (action.type === CHANGE_SERIAL) {
    return action.serial;
  }
  return state;
}

const initialConfigGoldRatio = [];

function updateConfigGoldRatio(state = initialConfigGoldRatio, action) {
  if (action.type === UPDATE_CONFIG_RATIO) {
    return action.config;
  };
  return state;
}

export default combineReducers({
  selectedCardType,
  code: changeCode,
  serial: changeSerial,
  configGoldRatio: updateConfigGoldRatio
})
