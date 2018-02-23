import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { Platform, PixelRatio } from 'react-native';

const navIconSize =
  __DEV__ === false && Platform.OS === 'android'
    ? PixelRatio.getPixelSizeForLayoutSize(25)
    : 25;

const replaceSuffixPattern = /--(active|big|small|very-big)/g;

const icons = {
  home: [navIconSize, Entypo],
  'ios-search': [navIconSize, Ionicons],
  camera: [navIconSize, Feather],
};

const iconsMap = {};

const iconsLoaded = () =>
  new Promise(resolve => {
    new Promise.all(
      Object.keys(icons).map(iconName => {
        const Provider = icons[iconName][1];
        return Provider.getImageSource(
          iconName.replace(replaceSuffixPattern, ''),
          icons[iconName][0],
        );
      }),
    ).then(sources => {
      Object.keys(icons).forEach(
        (iconName, i) => (iconsMap[iconName] = sources[i]),
      );

      resolve(true);
    });
  });

export { iconsMap, iconsLoaded };
