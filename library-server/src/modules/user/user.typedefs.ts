import { gql } from 'apollo-server';
import { DocumentNode } from 'graphql';

export const typeDefs: DocumentNode = gql`
  type User {
    id: Int
    name: String
    avatarUrl: String
  }

  extend type Query {
    userInfo: User
  }
`;
