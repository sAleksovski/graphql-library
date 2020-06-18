import { createBrowserHistory } from 'history';
import { Header } from 'pages/common/Header';
import { HomePage } from 'pages/Home';
import { ManageLoans } from 'pages/Loans';
import { LoginPage } from 'pages/Login';
import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import { AdminRoute } from './AdminRoute';

const history = createBrowserHistory();

export const Routes = () => (
  <Router history={history}>
    <Switch>
      <Route path="/login">
        <LoginPage />
      </Route>
      <AdminRoute path="/manage-loans">
        <Header />
        <ManageLoans />
      </AdminRoute>
      <PrivateRoute path="/">
        <Header />
        <HomePage />
      </PrivateRoute>
      <Route>Error</Route>
    </Switch>
  </Router>
);
