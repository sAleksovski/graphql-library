import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import React from 'react';
import { dateFormatter } from 'shared/helpers';
import {
  Author,
  BookDetailsWrapper,
  Description,
  Image,
  Left,
  LeftContent,
  LoanItem,
  Right,
  StyledButton,
  Title,
  UserLoanHistory,
} from './styled';

const GET_PENDING_LOAN_DETAILS = gql`
  query PendingLoan($loanId: Int!) {
    pendingLoan(loanId: $loanId) {
      id
      user {
        name
      }
      item {
        ... on Book {
          title
          thumbnail
          author
          description
        }
      }
      userLoanHistory {
        loanStart
        loanEnd
      }
    }
  }
`;

interface PendingLoanDetailsProps {
  loanId: number;
}

export function PendingLoanDetails({ loanId }: PendingLoanDetailsProps) {
  const { loading, error, data } = useQuery(GET_PENDING_LOAN_DETAILS, {
    variables: { loanId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <div>{`Error! ${error}`}</div>;

  return (
    <BookDetailsWrapper>
      <Left>
        <LeftContent>
          <Image src={data.pendingLoan.item.thumbnail} alt={`Cover for ${data.pendingLoan.item.title}`} />
          <StyledButton block color="success">
            Approve
          </StyledButton>
          <StyledButton block color="danger">
            Reject
          </StyledButton>
        </LeftContent>
      </Left>
      <Right>
        <Title>{data.pendingLoan.item.title}</Title>
        <Author>{data.pendingLoan.item.author}</Author>
        <Description>{data.pendingLoan.item.description}</Description>

        <UserLoanHistory>User loan history:</UserLoanHistory>
        {data.pendingLoan.userLoanHistory.map((userLoanHistory: any) => (
          <LoanItem key={userLoanHistory.loanStart} isReturned={!!userLoanHistory.loanEnd}>
            {dateFormatter.format(new Date(userLoanHistory.loanStart))} →{' '}
            {userLoanHistory.loanEnd ? dateFormatter.format(new Date(userLoanHistory.loanEnd)) : 'Not returned'}
          </LoanItem>
        ))}
      </Right>
    </BookDetailsWrapper>
  );
}
