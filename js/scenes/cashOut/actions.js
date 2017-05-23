const prefix = "transfer/";
export const SELECT_FEE_TYPE = prefix + 'SELECT_FEE_TYPE';
export const CHANGE_RECEIVER = prefix + 'CHANGE_RECEIVER';
export const CHANGE_VALUE = prefix + 'CHANGE_VALUE';
export const UPDATE_CONFIG_RATIO = prefix + 'UPDATE_CONFIG_RATIO';
export const TOGGLE_TUTORIAL = prefix + 'TOGGLE_TUTORIAL';

export function select_free_type(feeType) {
  return {
    type: SELECT_FEE_TYPE,
    feeType
  };
}

export function change_receiver(username) {
  return {
    type: CHANGE_RECEIVER,
    username
  };
}

export function change_value(value) {
  return {
    type: CHANGE_VALUE,
    value
  };
}

export function update_config_ratio(ratio) {
  return {
    type: UPDATE_CONFIG_RATIO,
    ratio
  };
}

export function toggle_tutorial(status) {
  return {
    type: TOGGLE_TUTORIAL,
    status
  };
}
