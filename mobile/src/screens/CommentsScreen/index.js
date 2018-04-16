import React, { PureComponent } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const GET_COMMENTS = gql`
  query comments($photoId: ID!) {
    comments(photoId: $photoId) {
      id
      text
      user {
        avatar
        id
        username
      }
    }
  }
`;

class CommentsScreen extends PureComponent {
  state = {};
  render() {
    console.log('====================================');
    console.log('this.props', this.props);
    console.log('====================================');
    return (
      <Query query={GET_COMMENTS} variables={{ photoId: this.props.photoId }}>
        {({ loading, error, data }) => {
          if (loading) {
            return (
              <View style={styles.loadingWrapper}>
                <ActivityIndicator size="large" />
              </View>
            );
          }

          if (error) {
            return (
              <View>
                <Text>Error: {JSON.stringify(error, null, 2)}</Text>
              </View>
            );
          }

          return (
            <View>
              <Text>{JSON.stringify(data, null, 2)}</Text>
            </View>
          );
        }}
      </Query>
    );
  }
}

const styles = StyleSheet.create({
  loadingWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CommentsScreen;
