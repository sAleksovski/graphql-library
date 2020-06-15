import { ApolloProvider } from '@apollo/react-hooks';
import React from 'react';
import { apolloClient } from './graphql';
import { Routes } from './Routes';
import { BaseStyles, NormalizeStyles } from './styles';
import './styles/fontStyles.css';

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
