import {combineReducers} from 'redux';
import {REQUEST_ITEMS, RECEIVE_ITEMS,RECEIVE_CONFIG} from './actions';

const initState = {
  items : [],
  total : 0,
  skip : 0,
  isFetching : false,
  merchantFee : 0
};

export default function receiverItems(state = initState, action) {
  if (action.type === RECEIVE_ITEMS) {
    var _return = {
      ...state,
      isFetching : false,
      items : state.items.concat(action.merchants),
      skip : state.skip + action.merchants.length,
      total : action.count
    };
    return _return;
  }
  if (action.type === REQUEST_ITEMS) {
    var _return = {
      ...state,
      isFetching : true,
    };
    return _return;
  }
  if (action.type === RECEIVE_CONFIG) {
    var _return = {
      ...state,
      merchantFee : action.merchantFee || 0
    };
    return _return;
  }
  return state;
}

// export default combineReducers({
//   items : receiverItems,
//
// })
