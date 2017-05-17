export const SELECT_CARD_TYPE = 'SELECT_CARD_TYPE';
export const CHANGE_SERIAL = 'CHANGE_SERIAL';
export const CHANGE_CODE = 'CHANGE_CODE';
export const UPDATE_CONFIG_RATIO = 'UPDATE_CONFIG_RATIO';

export function select_card_type(cardType) {
  return {
    type: SELECT_CARD_TYPE,
    cardType
  };
}

export function change_serial(serial) {
  return {
    type: CHANGE_SERIAL,
    serial
  };
}

export function change_code(code) {
  return {
    type: CHANGE_CODE,
    code
  };
}

export function update_config_ratio(config) {
  return {
    type: UPDATE_CONFIG_RATIO,
    config
  };
}
