import React from 'react';
import { Redirect, Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import { Modal } from 'shared/components/Modal';
import { Tab, Tabs } from 'shared/components/Tabs';
import { ActiveLoanDetails } from './ActiveLoanDetails';
import { ActiveLoanList } from './ActiveLoanList';
import { MyLoans } from './MyLoans';
import { PendingLoanDetails } from './PendingLoanDetails';
import { PendingLoanList } from './PendingLoanList';
import { PageWraper } from './styled';

export function ManageLoans() {
  const match = useRouteMatch();
  const history = useHistory();

  return (
    <PageWraper>
      <Tabs>
        <Tab to={`${match.path}/my`}>My Loans</Tab>
        <Tab to={`${match.path}/pending`}>Pending Loans</Tab>
        <Tab to={`${match.path}/active`}>Active Loans</Tab>
      </Tabs>
      <Switch>
        <Redirect exact from={`${match.path}`} to={`${match.path}/my`} />
        <Route path={`${match.path}/my`}>
          <MyLoans />
        </Route>
        <Route path={`${match.path}/pending`}>
          <PendingLoanList onSelectLoan={(id: number) => history.push(`${match.path}/pending/${id}`)} />
          <Route
            path={`${match.path}/pending/:loanId`}
            render={(routeProps) => (
              <Modal
                isOpen
                width={1040}
                withCloseIcon={true}
                onClose={() => history.push(`${match.path}/pending`)}
                renderContent={({ close }) => (
                  <PendingLoanDetails loanId={+routeProps.match.params.loanId} onLoanStateChanged={close} />
                )}
              />
            )}
          />
        </Route>

        <Route path={`${match.path}/active`}>
          <ActiveLoanList onSelectLoan={(id: number) => history.push(`${match.path}/active/${id}`)} />
          <Route
            path={`${match.path}/active/:loanId`}
            render={(routeProps) => (
              <Modal
                isOpen
                width={1040}
                withCloseIcon={true}
                onClose={() => history.push(`${match.path}/active`)}
                renderContent={({ close }) => (
                  <ActiveLoanDetails loanId={+routeProps.match.params.loanId} onLoanStateChanged={close} />
                )}
              />
            )}
          />
        </Route>
      </Switch>
    </PageWraper>
  );
}
