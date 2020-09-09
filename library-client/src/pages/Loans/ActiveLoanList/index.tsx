import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import React, { useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Avatar } from 'shared/components/Avatar';
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
import { dateFormatter } from 'shared/utils';

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

  if (loading) return <Loading />;
  if (error) {
    return (
      <EmptyState
        title="Failed to load the active loans"
        message="Some error occured while loading the active loans. Please try again."
        icon="loan"
      />
    );
  }

  if (data.activeLoans.length === 0) {
    return <EmptyState title="No active loans" message="There are currenly no active loans." icon="loan" />;
  }

  return (
    <LibraryList>
      {data.activeLoans.map((item: any, index: number) => (
        <LibraryListItem
          centerItems
          first={index === 0}
          last={index === data.activeLoans.length - 1}
          key={item.id}
          onClick={() => onSelectLoan(item.id)}
        >
          <LibraryListItemLeft>
            <Avatar avatarUrl={item.user.avatarUrl} name={item.user.name} />
          </LibraryListItemLeft>
          <LibraryListItemContent>
            <LibraryListItemTitle>{item.item.title}</LibraryListItemTitle>
            <LibraryListItemSubtitle noMargin>{dateFormatter.format(new Date(item.loanedAt))}</LibraryListItemSubtitle>
          </LibraryListItemContent>
          <LibraryListItemIcon type={item.item.type} />
        </LibraryListItem>
      ))}
    </LibraryList>
  );
}
