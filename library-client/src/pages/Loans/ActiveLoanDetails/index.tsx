import React from 'react';

interface ActiveLoanDetailsProps {
  loanId: number;
  onLoanStateChanged: () => void;
}

export function ActiveLoanDetails({ loanId, onLoanStateChanged = () => {} }: ActiveLoanDetailsProps) {
  return <div onClick={onLoanStateChanged}>Active loan details {loanId}</div>;
}
