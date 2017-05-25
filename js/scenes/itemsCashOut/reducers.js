import {REQUEST_ITEMS, RECEIVE_ITEMS} from './actions';

const initState = {
  items : [],
  total : 0,
  skip : 0,
  isFetching : false
};

export default function receiverItems(state = initState, action) {
  if (action.type === RECEIVE_ITEMS) {
    var _return = {
      ...state,
      isFetching : false,
      items : action.items,
      // skip : state.skip + action.items.length,
      skip : 0,
      total : action.total || 100
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
  return state;
}
