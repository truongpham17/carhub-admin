import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import useReactRouter from 'use-react-router';

import Layout from '../components/layout';
import { createEmployee, getEmployees } from '../redux/actions';

function CreateEmployee({ match }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('');
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const { history } = useReactRouter();

  function handleChangeUsername(e) {
    setUsername(e.target.value);
    setMessage('');
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
    setMessage('');
  }

  function handleChangeFullname(e) {
    setFullname(e.target.value);
    setMessage('');
  }

  function handleChangeEmail(e) {
    setEmail(e.target.value);
    setMessage('');
  }

  function handleChangePhone(e) {
    setPhone(e.target.value);
    setMessage('');
  }

  function handleChangeRole(e) {
    setRole(e.target.value);
    setMessage('');
  }

  function handleCreateEmployee(e) {
    e.preventDefault();
    createEmployee(dispatch)(
      {
        username,
        password,
        fullname,
        email,
        phone,
        role,
      },
      {
        success: () => {
          getEmployees(dispatch);
          history.push('/');
        },
        failure: () => setMessage('Create fail!'),
      }
    );
  }

  return (
    <Layout>
      <h1>Create employee</h1>
      <form onSubmit={handleCreateEmployee}>
        Company ID:
        <input type="text" value={match.params.id} required disabled />
        <br />
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
        Fullname:
        <input
          type="text"
          value={fullname}
          onChange={handleChangeFullname}
          required
        />
        <br />
        Email:
        <input
          type="email"
          value={email}
          onChange={handleChangeEmail}
          required
        />
        <br />
        Phone:
        <input
          type="text"
          value={phone}
          onChange={handleChangePhone}
          required
        />
        <br />
        Role:
        <select>
          <option value="1">Staff</option>
          <option value="2">Accountant</option>
          <option value="3">Manager</option>
        </select>
        <br />
        <button type="submit">Create</button>
      </form>
      <p>{message}</p>
    </Layout>
  );
}

CreateEmployee.propTypes = {
  match: PropTypes.object.isRequired,
};

export default CreateEmployee;
