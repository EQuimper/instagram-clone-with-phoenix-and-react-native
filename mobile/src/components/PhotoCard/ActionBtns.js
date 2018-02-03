import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Touchable from '@appandflow/touchable';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

import { makeHitSlop } from '../../utils/themes';

const styles = StyleSheet.create({
  root: {
    height: 50,
    paddingHorizontal: 16,
    flexDirection: 'row',
  },
  actionsWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  actionBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fakeView: {
    flex: 1.4,
  },
  bookmarkWrapper: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});

class ActionBtns extends Component {
  state = {};

  _getLikeIcon = () => {
    if (this.props.viewerLike) {
      return <Ionicons name="ios-heart" size={30} />;
    }

    return <Ionicons name="ios-heart-outline" size={30} />;
  };
  render() {
    return (
      <View style={styles.root}>
        <View style={styles.actionsWrapper}>
          <Touchable
            onPress={this.props.onLikedPress}
            hitSlop={makeHitSlop(10)}
            feedback="opacity"
            style={styles.actionBtn}
          >
            {this._getLikeIcon()}
          </Touchable>
          <Touchable
            hitSlop={makeHitSlop(10)}
            feedback="opacity"
            style={styles.actionBtn}
          >
            <EvilIcons name="comment" size={35} />
          </Touchable>
          <Touchable
            hitSlop={makeHitSlop(10)}
            feedback="opacity"
            style={styles.actionBtn}
          >
            <Ionicons name="ios-send-outline" size={35} />
          </Touchable>
        </View>
        <View style={styles.fakeView} />
        <Touchable
          hitSlop={makeHitSlop(20)}
          feedback="opacity"
          style={styles.bookmarkWrapper}
        >
          <Ionicons name="ios-bookmark-outline" size={35} />
        </Touchable>
      </View>
    );
  }
}

export default ActionBtns;
