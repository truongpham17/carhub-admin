import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import useReactRouter from 'use-react-router';
import { Link } from 'react-router-dom';

import { logout } from '../redux/actions';

function Layout({ children }) {
  const dispatch = useDispatch();
  const { history } = useReactRouter();

  function handleClickLogout() {
    logout(dispatch)();
    history.push('/login');
  }

  return (
    <div>
      <header>
        <button type="button" onClick={handleClickLogout}>
          Logout
        </button>{' '}
        <Link to="/">Home</Link> <Link to="/admins">Admins</Link>{' '}
        <Link to="/profile">Profile</Link>{' '}
      </header>
      {children}
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.any.isRequired,
};

export default Layout;
