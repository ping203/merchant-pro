import {getAppNavigator}  from '../AppRouteConfigs';
const AppNavigator = getAppNavigator();
const initialState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('login'));

export default function (state = initialState, action) {
  const nextState = AppNavigator.router.getStateForAction(action, state);
  if(nextState){
    console.log("nextState", nextState);
  }
  return nextState || state;
}
