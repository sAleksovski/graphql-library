import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { auth } from 'app/auth-helpers';

export function LoginPage() {
  const history = useHistory();
  const location = useLocation<{ from: { pathname: string } }>();
  const { from } = location.state || { from: { pathname: '/' } };

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = () => {
    auth
      .login({ username, password })
      .then(() => {
        history.replace(from);
      })
      .catch(() => alert('Bad credentials!'));
  };

  return (
    <div>
      <p>You must log in to view the page at {from.pathname}</p>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}></input>
      <input type="text" value={password} onChange={(e) => setPassword(e.target.value)}></input>
      <button onClick={login}>Log in</button>
    </div>
  );
}
