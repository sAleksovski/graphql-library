import { createBrowserHistory } from 'history';
import { HomePage } from 'pages/Home';
import { LoginPage } from 'pages/Login';
import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';

const history = createBrowserHistory();

const Routes = () => (
  <Router history={history}>
    <Switch>
      <Route path="/login">
        <LoginPage />
      </Route>
      <PrivateRoute path="/">
        <HomePage />
      </PrivateRoute>
      <Route>Error</Route>
    </Switch>
  </Router>
);

export default Routes;
