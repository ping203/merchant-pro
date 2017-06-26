
import type { Action } from '../actions/types';
import { OPEN_CONFIRM_POPUP, CLOSE_CONFIRM_POPUP, CONFIRM_POPUP_SELECT_NETWORK, UPDATE_MESSAGE_CONFIG } from '../actions/confirmPopup';

const initialState = {
  openState: 'opened',
  selectedNetwork : 'vtt',
  messageConfig : {}
};

export default function (state = initialState, action): State {
  if (action.type === OPEN_CONFIRM_POPUP) {
    return {
      ...state,
      openState: 'opened',
    };
  }

  if (action.type === CLOSE_CONFIRM_POPUP) {
    return {
      ...state,
      openState: 'closed',
    };
  }

  if (action.type === CONFIRM_POPUP_SELECT_NETWORK) {
    return {
      ...state,
      selectedNetwork: action.selectedNetwork
    };
  }

  if (action.type === UPDATE_MESSAGE_CONFIG) {
    return {
      ...state,
      messageConfig: action.messageConfig || {}
    };
  }

  return state;
}
