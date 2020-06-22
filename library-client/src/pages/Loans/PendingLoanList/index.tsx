import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import React, { useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Avatar } from 'shared/components/Avatar';
import { EmptyState } from 'shared/components/EmptyState';
import { BookIcon } from 'shared/components/Icon';
import { Loading } from 'shared/components/Loading';
import { dateFormatter } from 'shared/helpers';
import { LoanDate, LoanInfo, LoanListItem, LoanListWrapper, Title } from '../common';

const GET_PENDING_LOANS = gql`
  query PendingLoans {
    pendingLoans {
      id
      user {
        name
        avatarUrl
      }
      requestedAt
      item {
        ... on Book {
          title
          author
        }
        ... on BoardGame {
          title
        }
      }
    }
  }
`;

interface PendingLoanListProps {
  onSelectLoan?: (loanId: number) => void;
}

export function PendingLoanList({ onSelectLoan = () => {} }: PendingLoanListProps) {
  const match = useRouteMatch();

  const { loading, error, data, refetch } = useQuery(GET_PENDING_LOANS, {
    fetchPolicy: 'no-cache',
  });

  useEffect(() => {
    if (match.isExact) {
      refetch();
    }
  }, [match.isExact, refetch]);

  if (loading) return <Loading />;
  if (error) {
    return (
      <EmptyState
        title="Failed to load the pending loans"
        message="Some error occured while loading the pending loans. Please try again."
        icon="loan"
      />
    );
  }

  if (data.pendingLoans.length === 0) {
    return <EmptyState title="No pending loans" message="There are currenly no pending loans." icon="loan" />;
  }

  return (
    <LoanListWrapper>
      {data.pendingLoans.map((item: any, index: number) => (
        <LoanListItem
          first={index === 0}
          last={index === data.pendingLoans.length - 1}
          key={item.id}
          onClick={() => onSelectLoan(item.id)}
        >
          <Avatar avatarUrl={item.user.avatarUrl} name={item.user.name} />
          <LoanInfo>
            <Title>{item.item.title}</Title>
            <LoanDate>{dateFormatter.format(new Date(item.requestedAt))}</LoanDate>
          </LoanInfo>
          <BookIcon size={24} />
        </LoanListItem>
      ))}
    </LoanListWrapper>
  );
}
