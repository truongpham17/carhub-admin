import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect, withRouter } from 'react-router-dom';

import { auth } from '../utils/methods';

function PrivateRoute({ component: Component, redirectTo, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        auth() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: redirectTo,
              // eslint-disable-next-line react/prop-types
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  redirectTo: PropTypes.string.isRequired,
};

export default withRouter(PrivateRoute);
