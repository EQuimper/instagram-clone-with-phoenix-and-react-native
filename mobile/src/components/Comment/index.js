import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Touchable from '@appandflow/touchable';
import { human, systemWeights, iOSColors } from 'react-native-typography';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';

import { makeCircle } from '../../utils/themes';

class Comment extends PureComponent {
  state = {};
  render() {
    return (
      <View style={styles.root}>
        <View style={styles.avatarWrapper}>
          <Image
            style={styles.avatar}
            source={{ uri: this.props.user.avatar }}
          />
        </View>
        <View style={styles.contentWrapper}>
          <View>
            <Text style={styles.body}>
              <Text style={systemWeights.bold}>{this.props.user.username}</Text>{' '}
              {this.props.text}
            </Text>
          </View>
          <View style={styles.dateWrapper}>
            <Text style={styles.date}>
              {distanceInWordsToNow(this.props.insertedAt)} ago
            </Text>
          </View>
        </View>
        <Touchable feedback="opacity" style={styles.actionWrapper}>
          <Ionicons name="ios-heart-outline" size={15} />
        </Touchable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    minHeight: 70,
    flexDirection: 'row',
  },
  avatarWrapper: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  actionWrapper: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    ...makeCircle(30),
  },
  username: {},
  body: {
    ...systemWeights.thinObject,
    ...human.footnoteObject,
  },
  date: {
    ...systemWeights.thinObject,
    ...human.caption1Object,
    color: iOSColors.midGray,
  },
  dateWrapper: {
    marginTop: 5,
  },
});

export default Comment;
