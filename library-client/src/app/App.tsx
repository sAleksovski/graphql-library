import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import React from 'react';
import { auth } from './auth-helpers';
import BaseStyles from './BaseStyles';
import './fontStyles.css';
import NormalizeStyles from './NormalizeStyles';
import Routes from './Routes';

const client = new ApolloClient({
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

function App() {
  return (
    <>
      <NormalizeStyles />
      <BaseStyles />
      <ApolloProvider client={client}>
        <Routes />
      </ApolloProvider>
    </>
  );
}

export default App;
