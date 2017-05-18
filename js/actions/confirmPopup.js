
import type { Action } from './types';

export const OPEN_CONFIRM_POPUP = 'OPEN_CONFIRM_POPUP';
export const CLOSE_CONFIRM_POPUP = 'CLOSE_CONFIRM_POPUP';
export const CONFIRM_POPUP_SELECT_NETWORK = 'CONFIRM_POPUP_SELECT_NETWORK';
export const UPDATE_MESSAGE_CONFIG = 'UPDATE_MESSAGE_CONFIG';


export function open_confirm_popup() {
  return {
    type: OPEN_CONFIRM_POPUP,
  };
}

export function close_confirm_popup() {
  return {
    type: CLOSE_CONFIRM_POPUP
  };
}

export function confirm_popup_select_network(selectedNetwork) {
  return {
    type: CONFIRM_POPUP_SELECT_NETWORK,
    selectedNetwork
  };
}

export function update_message_config(messageConfig) {
  return {
    type: UPDATE_MESSAGE_CONFIG,
    messageConfig
  };
}
