import { gql } from 'apollo-server';
import { DocumentNode } from 'graphql';

export const typeDef: DocumentNode = gql`
  type Query
  type Mutation
`;
