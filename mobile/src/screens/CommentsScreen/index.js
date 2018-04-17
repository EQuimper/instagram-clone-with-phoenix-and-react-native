import React, { PureComponent } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const GET_COMMENTS = gql`
  query Comments($photoId: ID!) {
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
    return (
      <Query query={GET_COMMENTS} variables={{ photoId: this.props.photoId }}>
        {({ loading, error, data }) => {
          if (loading) {
            return (
              <View style={styles.root}>
                <ActivityIndicator size="large" />
              </View>
            );
          }

          if (error) {
            return (
              <View>
                <Text>{JSON.stringify(error)}</Text>
              </View>
            );
          }
          return (
            <ScrollView>
              <Text>{JSON.stringify(data, null, 2)}</Text>
            </ScrollView>
          );
        }}
      </Query>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CommentsScreen;
