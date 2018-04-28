import { PureComponent } from 'react';
import { Keyboard, Dimensions, Animated } from 'react-native';

const DURATION = 200;

class ListSpacer extends PureComponent {
  state = {
    screenHeight: Dimensions.get('window').height,
    flatListHeight: new Animated.Value(Dimensions.get('window').height),
  };

  componentDidMount() {
    this._keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyBoardDidShow,
    );
    this._keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyBoardDidHide,
    );
  }

  componentWillUnmount() {
    this._keyboardDidShowListener.remove();
    this._keyboardDidHideListener.remove();
  }

  _keyBoardDidShow = e => {
    Animated.timing(this.state.flatListHeight, {
      toValue: Dimensions.get('window').height - e.endCoordinates.height,
      duration: DURATION,
    }).start();
  };

  _keyBoardDidHide = () => {
    Animated.timing(this.state.flatListHeight, {
      toValue: Dimensions.get('window').height,
      duration: DURATION,
    }).start();
  };

  render() {
    const renderProps = {
      flatListHeight: this.state.flatListHeight,
    };

    if (this.props.children) {
      return this.props.children(renderProps);
    }

    return this.props.render(renderProps);
  }
}

export default ListSpacer;
