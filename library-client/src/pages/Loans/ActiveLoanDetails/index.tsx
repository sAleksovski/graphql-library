import { useMutation, useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import React from 'react';
import { EmptyState } from 'shared/components/EmptyState';
import { Loading } from 'shared/components/Loading';
import { dateFormatter } from 'shared/helpers';
import {
  Author,
  BookDetailsWrapper,
  Description,
  DetailsTitle,
  Image,
  Left,
  LeftContent,
  LoanItem,
  LoanItemDate,
  LoanItemTitle,
  Right,
  StyledButton,
  UserLoanHistory,
} from '../common';

const GET_ACTIVE_LOAN_DETAILS = gql`
  query ActiveLoan($loanId: Int!) {
    activeLoan(loanId: $loanId) {
      id
      user {
        name
      }
      item {
        ... on Book {
          title
          thumbnail
          author
          publisher
          description
        }
        ... on BoardGame {
          title
          thumbnail
          publisher
          description
        }
      }
      userLoanHistory {
        loanStart
        loanEnd
        item {
          ... on Book {
            title
          }
          ... on BoardGame {
            title
          }
        }
      }
    }
  }
`;

const RETURN_LOAN = gql`
  mutation ReturnLoan($loanEventId: Int!) {
    returnLoan(loanEventId: $loanEventId)
  }
`;

interface ActiveLoanDetailsProps {
  loanId: number;
  onLoanStateChanged: () => void;
}

export function ActiveLoanDetails({ loanId, onLoanStateChanged = () => {} }: ActiveLoanDetailsProps) {
  const { loading, error, data } = useQuery(GET_ACTIVE_LOAN_DETAILS, {
    variables: { loanId },
  });

  const [returnLoan] = useMutation(RETURN_LOAN, {
    onCompleted({ returnLoan }) {
      if (returnLoan) {
        onLoanStateChanged();
      }
    },
  });

  if (loading) return <Loading />;
  if (error) {
    return (
      <EmptyState
        title="Failed to load the loan details"
        message="Some error occured while loading the loan details. Please try again."
        icon="loan"
      />
    );
  }

  function onReturnLoanClick() {
    returnLoan({
      variables: {
        loanEventId: loanId,
      },
    });
  }

  return (
    <BookDetailsWrapper>
      <Left>
        <LeftContent>
          <Image src={data.activeLoan.item.thumbnail} alt={`Cover for ${data.activeLoan.item.title}`} />
          <StyledButton block color="success" onClick={onReturnLoanClick}>
            Return
          </StyledButton>
        </LeftContent>
      </Left>
      <Right>
        <DetailsTitle>{data.activeLoan.item.title}</DetailsTitle>
        <Author>{data.activeLoan.item.author || data.activeLoan.item.publisher}</Author>
        <Description dangerouslySetInnerHTML={{ __html: data.activeLoan.item.description }}></Description>

        <UserLoanHistory>User loan history:</UserLoanHistory>
        {data.activeLoan.userLoanHistory.map((userLoanHistory: any) => (
          <LoanItem key={userLoanHistory.loanStart}>
            <LoanItemTitle>{userLoanHistory.item.title}</LoanItemTitle>
            <LoanItemDate isReturned={!!userLoanHistory.loanEnd}>
              {dateFormatter.format(new Date(userLoanHistory.loanStart))} →{' '}
              {userLoanHistory.loanEnd ? dateFormatter.format(new Date(userLoanHistory.loanEnd)) : 'Not returned'}
            </LoanItemDate>
          </LoanItem>
        ))}
      </Right>
    </BookDetailsWrapper>
  );
}
