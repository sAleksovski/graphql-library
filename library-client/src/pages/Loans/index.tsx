import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import React from 'react';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import { Modal } from 'shared/components/Modal';
import { PendingLoanDetails } from './PendingLoanDetails';
import { PendingLoanList } from './PendingLoanList';

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

export function ManageLoans() {
  const match = useRouteMatch();
  const history = useHistory();

  const { loading, error, data, refetch } = useQuery(GET_PENDING_LOANS, {
    fetchPolicy: 'no-cache',
  });

  return (
    <Switch>
      <Route path={match.path}>
        <PendingLoanList
          loading={loading}
          error={error}
          pendingLoans={data?.pendingLoans}
          onSelectLoan={(id: number) => history.push(`${match.path}/${id}`)}
        />
        <Route
          path={`${match.path}/:loanId`}
          render={(routeProps) => (
            <Modal
              isOpen
              width={1040}
              withCloseIcon={true}
              onClose={() => history.push(match.url)}
              renderContent={({ close }) => (
                <PendingLoanDetails
                  loanId={+routeProps.match.params.loanId}
                  onLoanStateChanged={() => {
                    close();
                    refetch();
                  }}
                />
              )}
            />
          )}
        />
      </Route>
    </Switch>
  );
}
