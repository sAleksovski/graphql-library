import { gql } from 'apollo-server';
import { DocumentNode } from 'graphql';

export const typeDefs: DocumentNode = gql`
  type Book {
    id: Int!
    title: String
    author: String
  }

  input CreateBookInput {
    title: String
    author: String
  }

  extend type Query {
    books: [Book]
    book(id: Int!): Book
  }

  extend type Mutation {
    createBook(book: CreateBookInput!): Book
    createBookByIsbn(isbn: String!): Book
  }
`;
