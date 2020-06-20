import { gql } from 'apollo-server';
import { DocumentNode } from 'graphql';

export const typeDefs: DocumentNode = gql`
  type LoanHistory {
    user: User
    loanStart: Date
    loanEnd: Date
  }

  type LoanHistoryWithItem {
    user: User
    loanStart: Date
    loanEnd: Date
    item: LibraryItem
  }

  type LoanInfo {
    canLoan: Boolean
    hasPendingLoan: Boolean
    loanedToUser: Boolean
    loanHistory: [LoanHistory]
  }

  union LibraryItem = Book | BoardGame

  type PendingLoan {
    id: Int
    user: User
    requestedAt: Date
    item: LibraryItem
  }

  type PendingLoanInfo {
    id: Int
    user: User
    requestedAt: Date
    item: LibraryItem
    userLoanHistory: [LoanHistoryWithItem]
  }

  extend type Query {
    pendingLoans: [PendingLoan]
    pendingLoan(loanId: Int!): PendingLoanInfo
  }

  extend type Mutation {
    requestLoan(itemId: Int!): Boolean
    approveLoan(loanEventId: Int!): Boolean
    rejectLoan(loanEventId: Int!, reason: String!): Boolean
    returnLoan(loanEventId: Int!): Boolean
  }
`;
