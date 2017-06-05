const initAppNavigation = {};
import {UPDATE_APP_NAVIGATION} from "../actions/nav"

export default function (state = initAppNavigation, action) {
  if(action.type === UPDATE_APP_NAVIGATION){
    state = action.navigation ;
  }
  return state;
}
