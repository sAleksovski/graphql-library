import { ApolloProvider } from '@apollo/react-hooks';
import React from 'react';
import { apolloClient } from './apollo-client';
import BaseStyles from './BaseStyles';
import './fontStyles.css';
import NormalizeStyles from './NormalizeStyles';
import Routes from './Routes';

function App() {
  return (
    <>
      <NormalizeStyles />
      <BaseStyles />
      <ApolloProvider client={apolloClient}>
        <Routes />
      </ApolloProvider>
    </>
  );
}

export default App;
