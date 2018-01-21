import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Touchable from '@appandflow/touchable';
import { human, iOSColors } from 'react-native-typography';

import Header from './Header';
import ActionBtns from './ActionBtns';
import Meta from './Meta';
import CommentInput from '../CommentInput';

const styles = StyleSheet.create({
  root: {
    minHeight: 800,
    paddingBottom: 10,
  },
  img: {
    flex: 1,
  },
  commentsWrapper: {
    height: 50,
    paddingHorizontal: 16,
  },
  commentViewAll: {
    ...human.calloutObject,
    color: iOSColors.midGray,
  },
  timeAgoWrapper: {
    height: 70,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
  },
  timeAgo: {
    ...human.footnoteObject,
    color: iOSColors.midGray,
  },
});

class PhotoCard extends Component {
  state = {};
  render() {
    return (
      <View style={styles.root}>
        <Header />
        <Image
          style={styles.img}
          source={{
            uri: this.props.data.imageUrl,
          }}
        />
        <ActionBtns />
        <Meta caption={this.props.data.caption} />
        <View style={styles.commentsWrapper}>
          <Touchable feedback="opacity">
            <Text style={styles.commentViewAll}>View all 13 comments</Text>
          </Touchable>
          <CommentInput />
        </View>
        <View style={styles.timeAgoWrapper}>
          <Text style={styles.timeAgo}>6 HOURS AGO</Text>
        </View>
      </View>
    );
  }
}

export default PhotoCard;
