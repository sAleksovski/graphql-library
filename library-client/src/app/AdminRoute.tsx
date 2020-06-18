import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { auth } from './auth-helpers';

export function AdminRoute({ children, ...rest }: any) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.isAdmin() ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
