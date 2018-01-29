import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { AsyncStorage } from 'react-native';

import { authToken } from '../utils/constants';

let token;

const getToken = async () => {
  if (token != null) {
    return token;
  }

  token = await AsyncStorage.getItem(authToken);
  return token;
};

const cache = new InMemoryCache();

const httpLink = createHttpLink({ uri: 'http://localhost:4000/api/graphql' });

const authLink = setContext(async (_, { headers }) => {
  await getToken();
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
});
