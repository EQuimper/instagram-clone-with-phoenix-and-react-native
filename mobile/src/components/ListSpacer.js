import { PureComponent } from 'react';
import { Keyboard, Dimensions, Animated } from 'react-native';

const DURATION = 200;

class ListSpacer extends PureComponent {
  state = {
    flatListHeight: new Animated.Value(Dimensions.get('window').height),
    screenHeight: Dimensions.get('window').height,
  };

  componentDidMount() {
    this._keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow,
    );
    this._keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide,
    );
  }

  componentWillUnmount() {
    this._keyboardDidShowListener.remove();
    this._keyboardDidHideListener.remove();
  }

  _keyboardDidShow = e => {
    Animated.timing(this.state.flatListHeight, {
      toValue: this.state.screenHeight - e.endCoordinates.height,
      duration: DURATION,
    }).start();
  };

  _keyboardDidHide = () => {
    Animated.timing(this.state.flatListHeight, {
      toValue: this.state.screenHeight,
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
