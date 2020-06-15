import ApolloClient, { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-boost';
import { auth } from '../auth-helpers';
import introspectionQueryResultData from './fragmentTypes.json';

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
});

const cache = new InMemoryCache({ fragmentMatcher });

export const apolloClient = new ApolloClient({
  uri: '/api/graphql',
  cache,
  request: (operation) => {
    const token = auth.getToken();
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : '',
      },
    });
  },
});
