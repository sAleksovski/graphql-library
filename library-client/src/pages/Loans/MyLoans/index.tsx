import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import React from 'react';
import { BookIcon } from 'shared/components/Icon';
import { dateFormatter } from 'shared/helpers';
import { LoanDate, LoanInfo, LoanListItem, LoanListWrapper, Title } from '../common';
import { LoanStatusIcon, RejectReason } from './styled';

const GET_MY_LOANS = gql`
  query MyLoans {
    myLoans {
      id
      loanRequested
      loanDecided
      loanFinished
      reason
      status
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

export function MyLoans() {
  const { loading, error, data } = useQuery(GET_MY_LOANS, {
    fetchPolicy: 'no-cache',
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <LoanListWrapper>
      {data.myLoans.map((item: any, index: number) => (
        <LoanListItem first={index === 0} last={index === data.myLoans.length - 1} key={item.id}>
          <BookIcon size={24} />
          <LoanInfo>
            <Title>{item.item.title}</Title>
            {item.status === 'LOAN_REQUESTED' && (
              <LoanDate>Requested {dateFormatter.format(new Date(item.loanRequested))}</LoanDate>
            )}
            {item.status === 'LOAN_APPROVED' && <LoanDate>{dateFormatter.format(new Date(item.loanDecided))}</LoanDate>}
            {item.status === 'LOAN_REJECTED' && (
              <>
                <LoanDate>{dateFormatter.format(new Date(item.loanDecided))}</LoanDate>
                <RejectReason>{item.reason}</RejectReason>
              </>
            )}
            {item.status === 'LOAN_FINISHED' && (
              <LoanDate>
                {dateFormatter.format(new Date(item.loanRequested))} →{' '}
                {dateFormatter.format(new Date(item.loanFinished))}
              </LoanDate>
            )}
          </LoanInfo>
          <LoanStatusIcon status={item.status} />
        </LoanListItem>
      ))}
    </LoanListWrapper>
  );
}
