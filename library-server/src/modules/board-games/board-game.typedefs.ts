import { gql } from 'apollo-server';
import { DocumentNode } from 'graphql';

export const typeDefs: DocumentNode = gql`
  type BoardGame {
    id: Int!
    title: String
    description: String
    smallThumbnail: String
    thumbnail: String
    publisher: String
    publishedDate: String
    averageRating: Float
    ratingsCount: Float
    minPlayers: Int
    maxPlayers: Int
    minPlayTime: Int
    maxPlayTime: Int
    boardGameAtlasUrl: String
    officialUrl: String
    rulesUrl: String
    comments: [Comment]
    loanInfo: LoanInfo
  }

  extend type Query {
    boardGames: [BoardGame]
    boardGame(id: Int!): BoardGame
  }

  extend type Mutation {
    createBookByBoardGameAtlasId(boardGameAtlasId: String!): BoardGame
  }
`;
