import React, { Component } from 'react';
import {
  FlatList,
  ActivityIndicator,
  StyleSheet,
  View,
  RefreshControl,
} from 'react-native';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import { PhotoCard } from '../../components';
import { FeedsPhotoFragment } from './fragments';
import { iconsMap } from '../../utils/themes';

const styles = StyleSheet.create({
  loadingWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

class FeedsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRefreshing: false,
    };
    props.navigator.setOnNavigatorEvent(this._onNavigatorEvent.bind(this));
  }

  componentWillMount() {
    this.props.navigator.setButtons({
      leftButtons: [
        {
          id: 'camera',
          icon: iconsMap.camera,
        },
      ],
    });
  }

  _onNavigatorEvent(e) {
    if (e.type === 'NavBarButtonPress') {
      if (e.id === 'camera') {
        this.props.navigator.showModal({
          screen: 'instagramclone.CreatePhotoScreen',
          title: 'Choose a photo',
          animationType: 'slide-up',
        });
      }
    }
  }

  _keyExtractor = item => item.id;

  _renderItem = ({ item }) => (
    <PhotoCard navigator={this.props.navigator} data={item} />
  );

  _refreshRequest = async () => {
    this.setState({ isRefreshing: true });
    await this.props.data.refetch();
    this.setState({ isRefreshing: false });
  };

  render() {
    if (this.props.data.loading) {
      return (
        <View style={styles.loadingWrapper}>
          <ActivityIndicator size="large" />
        </View>
      );
    }

    return (
      <FlatList
        data={this.props.data.photos}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
        refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this._refreshRequest}
          />
        }
      />
    );
  }
}

const getPhotos = gql`
  query {
    photos {
      ...feedsPhoto
    }
  }
  ${FeedsPhotoFragment}
`;

export default graphql(getPhotos)(FeedsScreen);
