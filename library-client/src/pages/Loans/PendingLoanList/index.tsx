import { ApolloError } from 'apollo-boost';
import React from 'react';
import { Avatar } from 'shared/components/Avatar';
import { BookIcon } from 'shared/components/Icon';
import { dateFormatter } from 'shared/helpers';
import { LoanInfo, LoanListItem, LoanListWrapper, PageWraper, RequestedAt, Title } from './styled';

interface PendingLoanListProps {
  onSelectLoan?: (loanId: number) => void;
  loading: boolean;
  error: ApolloError | undefined;
  pendingLoans: any[];
}

export function PendingLoanList({ onSelectLoan = () => {}, loading, error, pendingLoans }: PendingLoanListProps) {
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <PageWraper>
      <LoanListWrapper>
        {pendingLoans.map((item: any, index: number) => (
          <LoanListItem
            first={index === 0}
            last={index === pendingLoans.length - 1}
            key={item.id}
            onClick={() => onSelectLoan(item.id)}
          >
            <Avatar avatarUrl={item.user.avatarUrl} name={item.user.name} />
            <LoanInfo>
              <Title>{item.item.title}</Title>
              <RequestedAt>{dateFormatter.format(new Date(item.requestedAt))}</RequestedAt>
            </LoanInfo>
            <BookIcon size={24} />
          </LoanListItem>
        ))}
      </LoanListWrapper>
    </PageWraper>
  );
}
