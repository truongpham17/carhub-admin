import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import useReactRouter from 'use-react-router';

import Layout from '../components/layout';
import { createCompany, getCompanies } from '../redux/actions';

function CreateCompany() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const { history } = useReactRouter();

  function handleChangeName(e) {
    setName(e.target.value);
    setMessage('');
  }

  function handleChangeEmail(e) {
    setEmail(e.target.value);
    setMessage('');
  }

  function handleCreateCompany(e) {
    e.preventDefault();
    createCompany(dispatch)(
      {
        name,
        email,
      },
      {
        success: () => {
          getCompanies(dispatch);
          history.push('/');
        },
        failure: () => setMessage('Create fail!'),
      }
    );
  }

  return (
    <Layout>
      <h1>Create company</h1>
      <form onSubmit={handleCreateCompany}>
        Name:
        <input type="text" value={name} onChange={handleChangeName} required />
        <br />
        Email:
        <input
          type="email"
          value={email}
          onChange={handleChangeEmail}
          required
        />
        <br />
        <button type="submit">Create</button>
      </form>
      <p>{message}</p>
    </Layout>
  );
}

export default CreateCompany;
