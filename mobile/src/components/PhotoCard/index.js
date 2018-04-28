import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Touchable from '@appandflow/touchable';
import { human, iOSColors } from 'react-native-typography';
import { graphql } from 'react-apollo';
import { defaultDataIdFromObject } from 'apollo-cache-inmemory';

import Header from './Header';
import ActionBtns from './ActionBtns';
import Meta from './Meta';
import CommentInput from '../CommentInput';
import { likePhotoMutation } from '../../graphql/mutations';
import { FeedsPhotoFragment } from '../../screens/FeedsScreen/fragments';

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

  _onLikedPress = () => {
    this.props.onLikePhotoMutation();
  };

  _goToComment = () => {
    this.props.navigator.push({
      screen: 'instagramclone.CommentsScreen',
      title: 'Comments',
      passProps: {
        photoId: this.props.data.id,
      },
      navigatorStyle: {
        tabBarHidden: true,
      },
    });
  };

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
        <ActionBtns
          viewerLike={this.props.data.viewerLike}
          onLikedPress={this._onLikedPress}
        />
        <Meta caption={this.props.data.caption} />
        <View style={styles.commentsWrapper}>
          <Touchable onPress={this._goToComment} feedback="opacity">
            <Text style={styles.commentViewAll}>View all 13 comments</Text>
          </Touchable>
          <CommentInput
            photoId={this.props.data.id}
            navigator={this.props.navigator}
          />
        </View>
        <View style={styles.timeAgoWrapper}>
          <Text style={styles.timeAgo}>6 HOURS AGO</Text>
        </View>
      </View>
    );
  }
}

export default graphql(likePhotoMutation, {
  props: ({ mutate, ownProps }) => ({
    onLikePhotoMutation: () =>
      mutate({
        variables: {
          photoId: ownProps.data.id,
        },
        update: (store, { data: { likePhoto } }) => {
          const id = defaultDataIdFromObject({
            __typename: 'Photo',
            id: ownProps.data.id,
          });

          const photo = store.readFragment({
            id,
            fragment: FeedsPhotoFragment,
          });

          store.writeFragment({
            id,
            fragment: FeedsPhotoFragment,
            data: {
              ...photo,
              viewerLike: likePhoto,
            },
          });
        },
      }),
  }),
})(PhotoCard);
