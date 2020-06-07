export interface RequestLoanInput {
  itemId: number;
}

export interface ApproveLoanInput {
  loanEventId: number;
}

export interface RejectLoanInput {
  loanEventId: number;
  reason: string;
}
