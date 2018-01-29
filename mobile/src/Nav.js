import { Navigation } from 'react-native-navigation';

import { registerScreens } from './screens';
import { iconsMap } from './utils/themes';
import appInitialized from './utils/appInitialized';

registerScreens();

export function startLogin() {
  Navigation.startSingleScreenApp({
    screen: {
      screen: 'instagramclone.LoginScreen',
      navigatorStyle: {
        navBarHidden: true,
      },
    },
  });
}

export function startMainApp() {
  Navigation.startTabBasedApp({
    tabs: [
      {
        label: 'Feeds',
        screen: 'instagramclone.FeedsScreen',
        title: 'Instagram',
        icon: iconsMap.home,
      },
      {
        label: 'Explore',
        screen: 'instagramclone.ExploreScreen',
        title: 'Explore',
        icon: iconsMap['ios-search'],
      },
    ],
  });
}

export function init() {
  appInitialized();
}
