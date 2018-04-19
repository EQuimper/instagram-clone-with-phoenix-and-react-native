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
import { fakeAvatar } from '../../utils/constants';
import { makeCircle, colors } from '../../utils/themes';

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
      this._input.focus();
    }, 1000);
  }

  _keyExtractor = item => item.id;

  _renderItem = ({ item }) => <Comment {...item} />;

  _handleChange = comment => this.setState({ comment });

  _onSubmit = () => {
    Alert.alert('Your comment is', this.state.comment);

    this.setState({
      comment: '',
    });
  };

  render() {
    return (
      <Fragment>
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
              <FlatList
                data={data.comments}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
              />
            );
          }}
        </Query>
        <KeyboardAvoidingView
          behavior="padding"
          style={styles.avoidingView}
          keyboardVerticalOffset={INPUT_HEIGHT}
        >
          <View style={styles.inputSection}>
            <Image source={{ uri: fakeAvatar }} style={styles.avatar} />
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Add a comment..."
                ref={ref => (this._input = ref)}
                returnKeyType="send"
                value={this.state.comment}
                onChangeText={this._handleChange}
                onSubmitEditing={this._onSubmit}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </Fragment>
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

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: colors.lightGray,
  },
  avatar: {
    ...makeCircle(40),
  },
  inputWrapper: {
    width: '85%',
    height: '70%',
    borderRadius: 25,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.lightGray,
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
  },
  avoidingView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default CommentsScreen;
