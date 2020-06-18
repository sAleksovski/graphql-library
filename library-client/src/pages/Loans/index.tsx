import React from 'react';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import { Modal } from 'shared/components/Modal';
import { PendingLoanDetails } from './PendingLoanDetails';
import { PendingLoanList } from './PendingLoanList';

export function ManageLoans() {
  const match = useRouteMatch();
  const history = useHistory();

  return (
    <Switch>
      <Route path={match.path}>
        <PendingLoanList onSelectLoan={(id: number) => history.push(`${match.path}/${id}`)} />
        <Route
          path={`${match.path}/:loanId`}
          render={(routeProps) => (
            <Modal
              isOpen
              width={1040}
              withCloseIcon={true}
              onClose={() => history.push(match.url)}
              renderContent={() => <PendingLoanDetails loanId={+routeProps.match.params.loanId} />}
            />
          )}
        />
      </Route>
    </Switch>
  );
}
