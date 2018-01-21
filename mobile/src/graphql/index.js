import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const cache = new InMemoryCache();

const link = new HttpLink({
  uri: 'http://localhost:4000/api/graphql',
});

export const client = new ApolloClient({
  link,
  cache,
});
