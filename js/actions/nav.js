import { NavigationActions } from 'react-navigation';
export const UPDATE_APP_NAVIGATION = 'UPDATE_APP_NAVIGATION';

export function update_app_navigation(navigation) {

  return {
    type : UPDATE_APP_NAVIGATION,
    navigation
  }
}
