import React from 'react';

interface PendingLoanDetailsProps {
  loanId: number;
}

export function PendingLoanDetails({ loanId }: PendingLoanDetailsProps) {
  return <div>{loanId}</div>;
}
