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

const styles = StyleSheet.create({
  loadingWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

class FeedsScreen extends Component {
  state = {
    isRefreshing: false,
  };

  _keyExtractor = item => item.id;

  _renderItem = ({ item }) => <PhotoCard data={item} />;

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
      id
      imageUrl
      caption
    }
  }
`;

export default graphql(getPhotos)(FeedsScreen);
