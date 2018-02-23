import React, { PureComponent } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Keyboard,
} from 'react-native';
import Touchable from '@appandflow/touchable';
import Ionicons from 'react-native-vector-icons/Ionicons';
import gql from 'graphql-tag';
import { withApollo } from 'react-apollo';

import { Divider } from '../../components';
import { colors } from '../../utils/themes';
import { uploadImageToS3 } from '../../utils/uploadImage';

const signS3Query = gql`
  query {
    presignUrl {
      url
      uploadUrl
    }
  }
`;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  header: {
    height: 150,
    flexDirection: 'row',
  },
  imgWrapper: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    height: 100,
    width: 70,
  },
  captionWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  captionInput: {
    width: '100%',
    paddingVertical: 10,
    paddingRight: 10,
    height: 100,
  },
  listItem: {
    height: 40,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});

class CaptionScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      caption: '',
    };

    props.navigator.setOnNavigatorEvent(this._onNavigatorEvent.bind(this));
  }

  componentDidMount() {
    this.props.navigator.setButtons({
      rightButtons: [
        {
          id: 'sharePost',
          title: 'Share',
        },
      ],
      animated: true,
    });
  }

  _onNavigatorEvent = e => {
    if (e.type === 'NavBarButtonPress') {
      if (e.id === 'sharePost') {
        this._onSharePostPress();
      }
    }
  };

  _onSharePostPress = async () => {
    const res = await this.props.client.query({ query: signS3Query });
    const resultFromS3 = await uploadImageToS3(
      this.props.image.node.image.uri,
      res.data.presignUrl,
    );

    console.log('====================================');
    console.log('resultFromS3', resultFromS3);
    console.log('====================================');
  };

  _onCaptionChange = caption => this.setState({ caption });

  render() {
    return (
      <Touchable
        onPress={Keyboard.dismiss}
        feedback="none"
        native={false}
        style={styles.root}
      >
        <View style={styles.header}>
          <View style={styles.imgWrapper}>
            <Image
              style={styles.img}
              source={{ uri: this.props.image.node.image.uri }}
            />
          </View>
          <View style={styles.captionWrapper}>
            <TextInput
              style={styles.captionInput}
              placeholder="Write a Caption..."
              multiline
              value={this.state.caption}
              onChangeText={this._onCaptionChange}
              underlineColorAndroid="rgba(0, 0, 0, 0)"
            />
          </View>
        </View>
        <Divider />
        <Touchable feedback="opacity" style={styles.listItem}>
          <View>
            <Text>Tags</Text>
          </View>
          <Ionicons
            name="ios-arrow-forward"
            size={20}
            color={colors.lightGray}
          />
        </Touchable>
      </Touchable>
    );
  }
}

export default withApollo(CaptionScreen);
