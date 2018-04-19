import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { iOSColors } from 'react-native-typography';
import Touchable from '@appandflow/touchable';

import { fakeAvatar } from '../utils/constants';
import { makeHitSlop, makeCircle } from '../utils/themes';

const styles = StyleSheet.create({
  root: {
    minHeight: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarWrapper: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  avatar: {
    ...makeCircle(30),
  },
  inputWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputText: {
    color: iOSColors.lightGray2,
  },
  input: {
    borderWidth: 1,
    borderColor: iOSColors.lightGray2,
    alignItems: 'flex-start',
    paddingVertical: 5,
    paddingHorizontal: 10,
    width: '95%',
    borderRadius: 20,
  },
});

class CommentInput extends Component {
  state = {};

  _goToComments = () => {
    this.props.navigator.push({
      screen: 'instagramclone.CommentsScreen',
      title: 'Comments',
      passProps: {
        photoId: this.props.photoId,
      },
      navigatorStyle: {
        tabBarHidden: true,
      },
    });
  };

  render() {
    return (
      <View style={styles.root}>
        <View style={styles.avatarWrapper}>
          <Image source={{ uri: fakeAvatar }} style={styles.avatar} />
        </View>
        <Touchable
          feedback="opacity"
          hitSlop={makeHitSlop(20)}
          style={styles.inputWrapper}
          onPress={this._goToComments}
        >
          <View style={styles.input}>
            <Text style={styles.inputText}>Add a comment...</Text>
          </View>
        </Touchable>
      </View>
    );
  }
}

export default CommentInput;
