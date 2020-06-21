import { LibraryItem } from 'modules/common';
import { UserInfo } from 'modules/user';

export interface LoanHistory {
  user: UserInfo;
  loanStart: Date;
  loanEnd?: Date;
}

export interface LoanHistoryWithItem extends LoanHistory {
  item: LibraryItem;
}

export interface LoanInfo {
  canLoan: boolean;
  hasPendingLoan: boolean;
  loanedToUser: boolean;
  loanHistory: LoanHistory[];
}

export interface PendingLoan {
  id: number;
  user: UserInfo;
  requestedAt: Date;
  item: LibraryItem;
}

export interface ActiveLoan {
  id: number;
  user: UserInfo;
  loanedAt: Date;
  item: LibraryItem;
}

export interface PendingLoanInfo extends PendingLoan {
  userLoanHistory: LoanHistoryWithItem[];
}

export interface ActiveLoanInfo extends ActiveLoan {
  userLoanHistory: LoanHistoryWithItem[];
}

export enum LoanEventType {
  LOAN_REQUESTED = 'LOAN_REQUESTED',
  LOAN_APPROVED = 'LOAN_APPROVED',
  LOAN_REJECTED = 'LOAN_REJECTED',
  LOAN_FINISHED = 'LOAN_FINISHED',
}
