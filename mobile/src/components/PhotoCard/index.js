import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

import Header from './Header';
import ActionBtns from './ActionBtns';

const styles = StyleSheet.create({
  root: {
    minHeight: 800,
    paddingBottom: 10,
  },
  img: {
    flex: 1
  }
});

class PhotoCard extends Component {
  state = {};
  render() {
    return (
      <View style={styles.root}>
        <Header />
        <Image style={styles.img} source={{ uri: 'https://www.what-dog.net/Images/faces2/scroll001.jpg' }} />
        <ActionBtns />
      </View>
    );
  }
}

export default PhotoCard;
