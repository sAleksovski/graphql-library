import { gql } from 'apollo-server';
import { DocumentNode } from 'graphql';

export const typeDefs: DocumentNode = gql`
  type BoardGame {
    id: ID!
    title: String
    boardGameGeekUrl: String
  }

  extend type Query {
    boardGames: [BoardGame]
    boardGame(id: String!): BoardGame
  }
`;
