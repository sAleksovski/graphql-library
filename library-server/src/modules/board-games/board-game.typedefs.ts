import { gql } from 'apollo-server';
import { DocumentNode } from 'graphql';

export const typeDefs: DocumentNode = gql`
  type BoardGame {
    id: Int!
    title: String
    boardGameGeekUrl: String
    comments: [Comment]
  }

  extend type Query {
    boardGames: [BoardGame]
    boardGame(id: Int!): BoardGame
  }
`;
