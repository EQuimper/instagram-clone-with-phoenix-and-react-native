import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import Touchable from '@appandflow/touchable';
import SearchIcon from 'react-native-vector-icons/Feather';

class TagScreen extends PureComponent {
  state = {};

  _onCancelPress = () => {
    this.props.navigator.pop({
      animated: true,
      animationType: 'fade',
    });
  };

  render() {
    return (
      <View style={styles.root}>
        <View style={styles.inputWrapper}>
          <View style={styles.searchWrapper}>
            <View style={styles.iconWrapper}>
              <SearchIcon name="search" size={15} color="#9D9C9C" />
            </View>
            <TextInput
              selectionColor="#9D9C9C"
              style={styles.input}
              placeholder="Search a tag"
              autoFocus
            />
          </View>
          <Touchable
            onPress={this._onCancelPress}
            style={styles.cancelBtn}
            feedback="opacity"
          >
            <Text>Cancel</Text>
          </Touchable>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  inputWrapper: {
    height: 60,
    width: '100%',
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    paddingHorizontal: 5,
  },
  iconWrapper: {
    flex: 0.1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchWrapper: {
    flex: 1,
    backgroundColor: '#E9E9EA',
    height: '60%',
    borderRadius: 8,
    flexDirection: 'row',
  },
  cancelBtn: {
    flex: 0.2,
    height: '60%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TagScreen;
