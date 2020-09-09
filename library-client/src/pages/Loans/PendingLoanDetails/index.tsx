import { useMutation, useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { refreshPendingLoansCount } from 'pages/common/Header';
import React, { useState } from 'react';
import { Button } from 'shared/components/Button';
import { EmptyState } from 'shared/components/EmptyState';
import {
  LibraryItemDetails,
  LibraryItemDetailsDescription,
  LibraryItemDetailsImage,
  LibraryItemDetailsLeft,
  LibraryItemDetailsLeftContent,
  LibraryItemDetailsRight,
  LibraryItemDetailsSubtitle,
  LibraryItemDetailsTitle,
} from 'shared/components/Library';
import { Loading } from 'shared/components/Loading';
import { Modal } from 'shared/components/Modal';
import { dateFormatter } from 'shared/utils';
import { LoanItem, LoanItemDate, LoanItemTitle, StyledButton, UserLoanHistory } from '../common';
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
        refreshPendingLoansCount();
      }
    },
  });

  const [rejectLoan] = useMutation(REJECT_LOAN, {
    onCompleted({ rejectLoan }) {
      if (rejectLoan) {
        onLoanStateChanged();
        refreshPendingLoansCount();
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
    <LibraryItemDetails>
      <LibraryItemDetailsLeft>
        <LibraryItemDetailsLeftContent>
          <LibraryItemDetailsImage
            src={data.pendingLoan.item.thumbnail}
            alt={`Cover for ${data.pendingLoan.item.title}`}
          />
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
        </LibraryItemDetailsLeftContent>
      </LibraryItemDetailsLeft>
      <LibraryItemDetailsRight>
        <LibraryItemDetailsTitle>{data.pendingLoan.item.title}</LibraryItemDetailsTitle>
        <LibraryItemDetailsSubtitle>
          {data.pendingLoan.item.author || data.pendingLoan.item.publisher}
        </LibraryItemDetailsSubtitle>
        <LibraryItemDetailsDescription dangerouslySetInnerHTML={{ __html: data.pendingLoan.item.description }} />

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
      </LibraryItemDetailsRight>
    </LibraryItemDetails>
  );
}
