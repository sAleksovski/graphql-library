import { createBrowserHistory } from 'history';
import { Header } from 'pages/common/Header';
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
        <Header />
        <HomePage />
      </PrivateRoute>
      <Route>Error</Route>
    </Switch>
  </Router>
);

export default Routes;
