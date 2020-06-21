import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import React, { useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Avatar } from 'shared/components/Avatar';
import { BookIcon } from 'shared/components/Icon';
import { dateFormatter } from 'shared/helpers';
import { LoanDate, LoanInfo, LoanListItem, LoanListWrapper, Title } from '../common';

const GET_ACTIVE_LOANS = gql`
  query ActiveLoans {
    activeLoans {
      id
      user {
        name
        avatarUrl
      }
      loanedAt
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

interface ActiveLoanListProps {
  onSelectLoan?: (loanId: number) => void;
}

export function ActiveLoanList({ onSelectLoan = () => {} }: ActiveLoanListProps) {
  const match = useRouteMatch();

  const { loading, error, data, refetch } = useQuery(GET_ACTIVE_LOANS, {
    fetchPolicy: 'no-cache',
  });

  useEffect(() => {
    if (match.isExact) {
      refetch();
    }
  }, [match.isExact, refetch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <LoanListWrapper>
      {data.activeLoans.map((item: any, index: number) => (
        <LoanListItem
          first={index === 0}
          last={index === data.activeLoans.length - 1}
          key={item.id}
          onClick={() => onSelectLoan(item.id)}
        >
          <Avatar avatarUrl={item.user.avatarUrl} name={item.user.name} />
          <LoanInfo>
            <Title>{item.item.title}</Title>
            <LoanDate>{dateFormatter.format(new Date(item.loanedAt))}</LoanDate>
          </LoanInfo>
          <BookIcon size={24} />
        </LoanListItem>
      ))}
    </LoanListWrapper>
  );
}
