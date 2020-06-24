import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import React from 'react';
import { EmptyState } from 'shared/components/EmptyState';
import {
  LibraryList,
  LibraryListItem,
  LibraryListItemContent,
  LibraryListItemIcon,
  LibraryListItemLeft,
  LibraryListItemSubtitle,
  LibraryListItemTitle,
} from 'shared/components/Library';
import { Loading } from 'shared/components/Loading';
import { dateFormatter } from 'shared/helpers';
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
          type
        }
        ... on BoardGame {
          title
          type
        }
      }
    }
  }
`;

export function MyLoans() {
  const { loading, error, data } = useQuery(GET_MY_LOANS, {
    fetchPolicy: 'no-cache',
  });

  if (loading) return <Loading />;
  if (error) {
    return (
      <EmptyState
        title="Failed to load the your loans"
        message="Some error occured while loading your loans. Please try again."
        icon="loan"
      />
    );
  }

  if (data.myLoans.length === 0) {
    return (
      <EmptyState
        title="You haven't loaned anything"
        message="Go to the home page and browse available library items."
        icon="loan"
      />
    );
  }

  return (
    <LibraryList>
      {data.myLoans.map((item: any, index: number) => (
        <LibraryListItem first={index === 0} last={index === data.myLoans.length - 1} key={item.id} centerItems>
          <LibraryListItemLeft>
            <LibraryListItemIcon type={item.item.type} />
          </LibraryListItemLeft>
          <LibraryListItemContent>
            <LibraryListItemTitle>{item.item.title}</LibraryListItemTitle>
            {item.status === 'LOAN_REQUESTED' && (
              <LibraryListItemSubtitle noMargin>
                Requested {dateFormatter.format(new Date(item.loanRequested))}
              </LibraryListItemSubtitle>
            )}
            {item.status === 'LOAN_APPROVED' && (
              <LibraryListItemSubtitle noMargin>
                {dateFormatter.format(new Date(item.loanDecided))}
              </LibraryListItemSubtitle>
            )}
            {item.status === 'LOAN_REJECTED' && (
              <>
                <LibraryListItemSubtitle>{dateFormatter.format(new Date(item.loanDecided))}</LibraryListItemSubtitle>
                <RejectReason>{item.reason}</RejectReason>
              </>
            )}
            {item.status === 'LOAN_FINISHED' && (
              <LibraryListItemSubtitle noMargin>
                {dateFormatter.format(new Date(item.loanRequested))} →{' '}
                {dateFormatter.format(new Date(item.loanFinished))}
              </LibraryListItemSubtitle>
            )}
          </LibraryListItemContent>
          <LoanStatusIcon status={item.status} />
        </LibraryListItem>
      ))}
    </LibraryList>
  );
}
