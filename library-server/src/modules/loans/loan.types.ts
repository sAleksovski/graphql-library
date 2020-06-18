import { LoanableItem } from 'modules/common';
import { UserInfo } from 'modules/user';

export interface LoanHistory {
  user: UserInfo;
  loanStart: Date;
  loanEnd?: Date;
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
  item: LoanableItem;
}

export interface PendingLoanInfo extends PendingLoan {
  userLoanHistory: LoanHistory[];
}

export enum LoanEventType {
  LOAN_REQUESTED = 'LOAN_REQUESTED',
  LOAN_APPROVED = 'LOAN_APPROVED',
  LOAN_REJECTED = 'LOAN_REJECTED',
  LOAN_FINISHED = 'LOAN_FINISHED',
}
