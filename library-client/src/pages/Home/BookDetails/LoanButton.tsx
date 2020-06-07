import { useMutation } from '@apollo/react-hooks';
import { DocumentNode, gql } from 'apollo-boost';
import React from 'react';
import { Button } from 'shared/components/Button';

const REQUEST_LOAN = gql`
  mutation RequestLoan($itemId: Int!) {
    requestLoan(itemId: $itemId)
  }
`;

interface LoanButtonProps {
  itemId: number;
  loanInfo: {
    canLoan: boolean;
    hasPendingLoan: boolean;
    loanedToUser: boolean;
  };
  queryWithVariables: {
    query: DocumentNode;
    variables: { [key: string]: string | number };
  };
  propertyKey: string;
}

export function LoanButton({
  itemId,
  queryWithVariables,
  propertyKey,
  loanInfo: { canLoan, hasPendingLoan, loanedToUser },
}: LoanButtonProps) {
  const [requestLoan] = useMutation(REQUEST_LOAN, {
    update(cache) {
      const cachedQuery = cache.readQuery<{ [key: string]: any }>(queryWithVariables) || {};
      cache.writeQuery({
        ...queryWithVariables,
        data: {
          [propertyKey]: {
            ...cachedQuery[propertyKey],
            loanInfo: {
              ...cachedQuery[propertyKey].loanInfo,
              canLoan: false,
              hasPendingLoan: true,
              loanedToUser: false,
            },
          },
        },
      });
    },
  });

  function onButtonClick() {
    requestLoan({
      variables: {
        itemId,
      },
    });
  }

  return (
    <Button block disabled={!canLoan} onClick={onButtonClick}>
      {canLoan && 'Loan book'}
      {hasPendingLoan && 'Pending approval'}
      {loanedToUser && 'You have this'}
      {!canLoan && !hasPendingLoan && !loanedToUser && 'Unavailable'}
    </Button>
  );
}
