import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';

import { PhotoCard } from '../../components'

class FeedsScreen extends Component {
  state = {  }
  render() {
    return (
      <ScrollView>
        <PhotoCard />
      </ScrollView>
    );
  }
}

export default FeedsScreen;