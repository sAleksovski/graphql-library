import { gql } from 'apollo-server';
import { DocumentNode } from 'graphql';

export const typeDef: DocumentNode = gql`
  type Query
  type Mutation

  scalar Date

  type Comment {
    id: Int
    content: String
    createdAt: Date
    user: User
  }

  input CreateCommentInput {
    itemId: Int!
    content: String!
  }

  extend type Mutation {
    createComment(comment: CreateCommentInput!): [Comment]
  }
`;
