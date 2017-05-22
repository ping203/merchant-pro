import {combineReducers} from 'redux';
import {SELECT_FEE_TYPE, CHANGE_RECEIVER, CHANGE_VALUE, UPDATE_CONFIG_RATIO, TOGGLE_TUTORIAL} from './actions';


function feeType(state = "sender", action) {
  if (action.type === SELECT_FEE_TYPE) {
    return action.feeType;
  }
  return state;
}

function changeReceiver(state = "", action) {
  if (action.type === CHANGE_RECEIVER) {
    return action.username;
  }
  return state;
}

function changeValue(state = 0, action) {
  if (action.type === CHANGE_VALUE) {
    return action.value;
  }
  return state;
}

function updateConfigRatio(state = 0.05, action) {
  if (action.type === UPDATE_CONFIG_RATIO) {
    return action.ratio;
  };
  return state;
}

function changeTutorialPopup(state = false, action) {
  if (action.type === TOGGLE_TUTORIAL) {
    return action.status;
  };
  return state;
}

export default combineReducers({
  feeType,
  receiver: changeReceiver,
  value: changeValue,
  ratio: updateConfigRatio,
  tutorialPopupStatus: changeTutorialPopup
})
