import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import { Tab, Tabs } from 'shared/components/Tabs';
import { AddBoardGame } from './AddBoardGame';
import { AddBook } from './AddBook';
import { AdminPageWraper } from './styled';

export function AdminPage() {
  const match = useRouteMatch();
  return (
    <AdminPageWraper>
      <Tabs>
        <Tab to={`${match.path}/books`}>Books</Tab>
        <Tab to={`${match.path}/board-games`}>Board Games</Tab>
      </Tabs>

      <Switch>
        <Redirect exact from={`${match.path}`} to={`${match.path}/books`} />
        <Route path={`${match.path}/books`}>
          <AddBook />
        </Route>
        <Route path={`${match.path}/board-games`}>
          <AddBoardGame />
        </Route>
      </Switch>
    </AdminPageWraper>
  );
}
