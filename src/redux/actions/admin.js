import fetchAPI from '../../utils/service';

import { adminTypes, companiesTypes } from '../action-types';

function loginRequest() {
  return {
    type: adminTypes.LOGIN_REQUEST,
  };
}
function loginSuccess(payload) {
  return {
    type: adminTypes.LOGIN_SUCCESS,
    payload,
  };
}
function loginFailure() {
  return {
    type: adminTypes.LOGIN_FAILURE,
  };
}
function login(dispatch) {
  return async (data, callbacks) => {
    dispatch(loginRequest());
    try {
      const response = await fetchAPI({
        method: 'POST',
        endpoints: '/admins/login',
        data,
      });
      if (response.status === 200) {
        dispatch(loginSuccess(response.data));
        if (callbacks && typeof callbacks.failure === 'function')
          callbacks.success();
      } else {
        dispatch(loginFailure());
        if (callbacks && typeof callbacks.failure === 'function')
          callbacks.failure();
      }
    } catch (error) {
      dispatch(loginFailure());
      if (callbacks && typeof callbacks.failure === 'function')
        callbacks.failure(error);
    }
  };
}

function logout(dispatch) {
  return () => {
    dispatch({
      type: adminTypes.LOGOUT,
    });
    dispatch({
      type: companiesTypes.LOGOUT_COMPANIES,
    });
  };
}

export { login, logout };
