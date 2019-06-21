import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import useReactRouter from 'use-react-router';

import { login } from '../redux/actions';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const { history } = useReactRouter();

  function submit(e) {
    e.preventDefault();
    login(dispatch)(
      { username, password },
      {
        success: () => history.push('/'),
        failure: () => setMessage('Wrong username or password!'),
      }
    );
  }

  function handleChangeUsername(e) {
    setUsername(e.target.value);
    setMessage('');
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
    setMessage('');
  }

  return (
    <div>
      <form onSubmit={submit}>
        Username:
        <input
          type="text"
          value={username}
          onChange={handleChangeUsername}
          required
        />
        <br />
        Password:
        <input
          type="password"
          value={password}
          onChange={handleChangePassword}
          required
        />
        <br />
        <button type="submit">Login</button>
        <p>{message}</p>
      </form>
    </div>
  );
}

export default LoginPage;
