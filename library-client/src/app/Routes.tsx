import { createBrowserHistory } from 'history';
import { AdminPage } from 'pages/Admin';
import { Header } from 'pages/common/Header';
import { HomePage } from 'pages/Home';
import { ManageLoans } from 'pages/Loans';
import { LoginPage } from 'pages/Login';
import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import { AdminRoute } from './AdminRoute';
import { PrivateRoute } from './PrivateRoute';

const history = createBrowserHistory();

export const Routes = () => (
  <Router history={history}>
    <Switch>
      <Route path="/login">
        <LoginPage />
      </Route>
      <Route path="/loans">
        <Header />
        <ManageLoans />
      </Route>
      <AdminRoute path="/admin">
        <Header />
        <AdminPage />
      </AdminRoute>
      <PrivateRoute path="/">
        <Header />
        <HomePage />
      </PrivateRoute>
      <Route>Error</Route>
    </Switch>
  </Router>
);
