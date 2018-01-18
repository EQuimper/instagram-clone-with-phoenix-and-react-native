import { Navigation } from 'react-native-navigation'

import FeedsScreen from './FeedsScreen'
import ExploreScreen from './ExploreScreen'

export const registerScreens = () => {
  Navigation.registerComponent('instagramclone.FeedsScreen', () => FeedsScreen)
  Navigation.registerComponent('instagramclone.ExploreScreen', () => ExploreScreen)
}