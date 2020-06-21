import { useMutation, useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import React, { useState } from 'react';
import { Button } from 'shared/components/Button';
import { Modal } from 'shared/components/Modal';
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
import { ButtonBar, RejectLoanDialog, RejectLoanDialogTitle, StyledInput } from './styled';

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
        item {
          ... on Book {
            title
          }
        }
      }
    }
  }
`;

const APPROVE_LOAN = gql`
  mutation ApproveLoan($loanEventId: Int!) {
    approveLoan(loanEventId: $loanEventId)
  }
`;

const REJECT_LOAN = gql`
  mutation rejectLoan($loanEventId: Int!, $reason: String!) {
    rejectLoan(loanEventId: $loanEventId, reason: $reason)
  }
`;

interface PendingLoanDetailsProps {
  loanId: number;
  onLoanStateChanged: () => void;
}

export function PendingLoanDetails({ loanId, onLoanStateChanged = () => {} }: PendingLoanDetailsProps) {
  const [reason, setReason] = useState('');
  const { loading, error, data } = useQuery(GET_PENDING_LOAN_DETAILS, {
    variables: { loanId },
  });

  const [approveLoan] = useMutation(APPROVE_LOAN, {
    onCompleted({ approveLoan }) {
      if (approveLoan) {
        onLoanStateChanged();
      }
    },
  });

  const [rejectLoan] = useMutation(REJECT_LOAN, {
    onCompleted({ rejectLoan }) {
      if (rejectLoan) {
        onLoanStateChanged();
      }
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <div>{`Error! ${error}`}</div>;

  function onApproveLoanClick() {
    approveLoan({
      variables: {
        loanEventId: loanId,
      },
    });
  }

  function onRejectLoanClick(close: Function) {
    rejectLoan({
      variables: {
        loanEventId: loanId,
        reason,
      },
    });
    close();
  }

  return (
    <BookDetailsWrapper>
      <Left>
        <LeftContent>
          <Image src={data.pendingLoan.item.thumbnail} alt={`Cover for ${data.pendingLoan.item.title}`} />
          <StyledButton block color="success" onClick={onApproveLoanClick}>
            Approve
          </StyledButton>
          <Modal
            width={520}
            withCloseIcon={true}
            backdrop={false}
            renderLink={({ open }) => (
              <StyledButton block color="danger" onClick={open}>
                Reject
              </StyledButton>
            )}
            renderContent={({ close }) => (
              <RejectLoanDialog>
                <RejectLoanDialogTitle>Please state your reason for rejecting the loan</RejectLoanDialogTitle>
                <StyledInput type="text" value={reason} onChange={(e) => setReason(e.target.value)} />
                <ButtonBar>
                  <Button color="danger" onClick={() => onRejectLoanClick(close)}>
                    Reject
                  </Button>
                </ButtonBar>
              </RejectLoanDialog>
            )}
          />
        </LeftContent>
      </Left>
      <Right>
        <DetailsTitle>{data.pendingLoan.item.title}</DetailsTitle>
        <Author>{data.pendingLoan.item.author}</Author>
        <Description>{data.pendingLoan.item.description}</Description>

        <UserLoanHistory>User loan history:</UserLoanHistory>
        {data.pendingLoan.userLoanHistory.map((userLoanHistory: any) => (
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
