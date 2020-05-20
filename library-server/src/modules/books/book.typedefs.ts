import { gql } from 'apollo-server';
import { DocumentNode } from 'graphql';

export const typeDefs: DocumentNode = gql`
  type Category {
    id: Int
    name: String
  }

  type Book {
    id: Int!
    title: String
    author: String
    publisher: String
    publishedDate: String
    description: String
    isbn13: String
    isbn10: String
    pageCount: Float
    printType: String
    categories: [Category]
    averageRating: Float
    ratingsCount: Float
    smallThumbnail: String
    thumbnail: String
    language: String
    infoLink: String
    comments: [Comment]
  }

  input CreateBookInput {
    title: String!
    author: String!
    publisher: String!
    publishedDate: String!
    description: String!
    isbn13: String
    isbn10: String
    pageCount: Float
    printType: String
    categories: [String]
    averageRating: Float
    ratingsCount: Float
    smallThumbnail: String!
    thumbnail: String!
    language: String
    infoLink: String
  }

  extend type Query {
    books: [Book]
    book(id: Int!): Book
  }

  extend type Mutation {
    createBook(book: CreateBookInput!): Book
    createBookByIsbn(isbn: String!): Book
    createBooksByIsbns(isbnList: [String]!): [Book]
  }
`;
