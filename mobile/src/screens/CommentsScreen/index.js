import React, { PureComponent, Fragment } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import { Comment } from '../../components';
import { colors, makeCircle } from '../../utils/themes';
import { fakeAvatar } from '../../utils/constants';

const INPUT_HEIGHT = 60;

const GET_COMMENTS = gql`
  query Comments($photoId: ID!) {
    comments(photoId: $photoId) {
      id
      text
      insertedAt
      user {
        avatar
        id
        username
      }
    }
  }
`;

class CommentsScreen extends PureComponent {
  state = {
    comment: '',
  };

  componentDidMount() {
    setTimeout(() => {
      console.log('====================================');
      console.log('this.', this._input);
      console.log('====================================');
      this._input.focus();
    }, 1000);
  }

  _keyExtractor = item => item.id;

  _renderItem = ({ item }) => <Comment {...item} />;

  _handleChange = comment => {
    this.setState({
      comment,
    });
  };

  _onSubmit = () => {
    Alert.alert('Your comment is', this.state.comment);
    this.setState({
      comment: '',
    });
  };

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
            <Fragment>
              <FlatList
                data={data.comments}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
              />
              <KeyboardAvoidingView
                behavior="padding"
                style={styles.avoidingView}
                keyboardVerticalOffset={INPUT_HEIGHT}
              >
                <View style={styles.inputSection}>
                  <View>
                    <Image source={{ uri: fakeAvatar }} style={styles.avatar} />
                  </View>
                  <View style={styles.inputWrapper}>
                    <TextInput
                      ref={ref => (this._input = ref)}
                      style={styles.input}
                      placeholder="Add a comment..."
                      returnKeyType="send"
                      onChangeText={this._handleChange}
                      value={this.state.comment}
                      onSubmitEditing={this._onSubmit}
                    />
                  </View>
                </View>
              </KeyboardAvoidingView>
            </Fragment>
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
  inputSection: {
    height: INPUT_HEIGHT,

    justifyContent: 'space-between',
    paddingHorizontal: 16,
    alignItems: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: colors.lightGray,
    flexDirection: 'row',
  },
  inputWrapper: {
    width: '85%',
    height: '70%',
    borderRadius: 25,
    paddingHorizontal: 16,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.lightGray,
  },
  input: {
    flex: 1,
  },
  avatar: {
    ...makeCircle(40),
  },
  avoidingView: { position: 'absolute', left: 0, bottom: 0, right: 0 },
});

export default CommentsScreen;
