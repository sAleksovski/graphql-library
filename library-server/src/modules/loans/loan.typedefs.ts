import { gql } from 'apollo-server';
import { DocumentNode } from 'graphql';

export const typeDefs: DocumentNode = gql`
  type LoanHistory {
    user: User
    loanStart: Date
    loanEnd: Date
  }

  type LoanInfo {
    canLoan: Boolean
    hasPendingLoan: Boolean
    loanedToUser: Boolean
    loanHistory: [LoanHistory]
  }

  union LoanableItem = Book | BoardGame

  type PendingLoan {
    id: Int
    user: User
    requestedAt: Date
    item: LoanableItem
  }

  extend type Query {
    pendingLoans: [PendingLoan]
  }

  extend type Mutation {
    requestLoan(itemId: Int!): Boolean
    approveLoan(loanEventId: Int!): Boolean
    rejectLoan(loanEventId: Int!, reason: String!): Boolean
  }
`;
