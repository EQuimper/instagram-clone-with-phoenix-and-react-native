import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';

import { client } from '../graphql';

export default function WithProvider(WrappedComponent) {
  return class Cp extends Component {
    render() {
      return (
        <ApolloProvider client={client}>
          <WrappedComponent {...this.props} />
        </ApolloProvider>
      );
    }
  };
}
