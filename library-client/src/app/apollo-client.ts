import ApolloClient from 'apollo-boost';
import { auth } from './auth-helpers';

export const apolloClient = new ApolloClient({
  uri: '/api/graphql',
  request: (operation) => {
    const token = auth.getToken();
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : '',
      },
    });
  },
});
