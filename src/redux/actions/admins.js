import fetchAPI from '../../utils/service';

import { adminsTypes, postsTypes, productTypesTypes } from '../action-types';

function loginRequest() {
  return {
    type: adminsTypes.LOGIN_REQUEST,
  };
}
function loginSuccess(payload) {
  return {
    type: adminsTypes.LOGIN_SUCCESS,
    payload,
  };
}
function loginFailure() {
  return {
    type: adminsTypes.LOGIN_FAILURE,
  };
}
function login(dispatch) {
  return async (data, callbacks) => {
    dispatch(loginRequest());
    try {
      console.log(data);
      const response = await fetchAPI({
        method: 'POST',
        endpoints: 'account/login',
        data,
      });

      console.log('come herre!!!');
      console.log(response.data);

      if (response.status === 200) {
        dispatch(loginSuccess(response.data));
        if (callbacks && typeof callbacks.success === 'function')
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

// Get admins
function getAdminsRequest() {
  return {
    type: adminsTypes.GET_ADMINS_REQUEST,
  };
}
function getAdminsSuccess(payload) {
  return {
    type: adminsTypes.GET_ADMINS_SUCCESS,
    payload,
  };
}
function getAdminsFailure() {
  return {
    type: adminsTypes.GET_ADMINS_FAILURE,
  };
}
function getAdmins(dispatch) {
  return async callbacks => {
    dispatch(getAdminsRequest());
    try {
      const response = await fetchAPI({
        method: 'GET',
        endpoints: '/admins',
      });
      if (response.status === 200) {
        dispatch(getAdminsSuccess(response.data));
        if (callbacks && typeof callbacks.failure === 'function')
          callbacks.success();
      } else {
        dispatch(getAdminsFailure());
        if (callbacks && typeof callbacks.failure === 'function')
          callbacks.failure();
      }
    } catch (error) {
      dispatch(getAdminsFailure());
      if (callbacks && typeof callbacks.failure === 'function')
        callbacks.failure(error);
    }
  };
}

// Create admin
function createAdminRequest() {
  return {
    type: adminsTypes.CREATE_ADMIN_REQUEST,
  };
}
function createAdminSuccess(payload) {
  return {
    type: adminsTypes.CREATE_ADMIN_SUCCESS,
    payload,
  };
}
function createAdminFailure() {
  return {
    type: adminsTypes.CREATE_ADMIN_FAILURE,
  };
}
function createAdmin(dispatch) {
  return async (data, callbacks) => {
    dispatch(createAdminRequest());
    try {
      const response = await fetchAPI({
        method: 'POST',
        endpoints: '/admins',
        data,
      });
      if (response.status === 201) {
        dispatch(createAdminSuccess(response.data));
        getAdmins(dispatch)(callbacks);
      } else {
        dispatch(createAdminFailure());
        if (callbacks && typeof callbacks.failure === 'function')
          callbacks.failure();
      }
    } catch (error) {
      dispatch(createAdminFailure());
      if (callbacks && typeof callbacks.failure === 'function')
        callbacks.failure(error);
    }
  };
}

// Update admin
function updateAdminRequest() {
  return {
    type: adminsTypes.UPDATE_ADMIN_REQUEST,
  };
}
function updateAdminSuccess(payload) {
  return {
    type: adminsTypes.UPDATE_ADMIN_SUCCESS,
    payload,
  };
}
function updateAdminFailure() {
  return {
    type: adminsTypes.UPDATE_ADMIN_FAILURE,
  };
}
function updateAdmin(dispatch) {
  return async (id, data, callbacks) => {
    dispatch(updateAdminRequest());
    try {
      const response = await fetchAPI({
        method: 'PATCH',
        endpoints: `/admins/${id}`,
        data,
      });
      if (response.status === 200) {
        dispatch(updateAdminSuccess(response.data));
        getAdmins(dispatch)(callbacks);
      } else {
        dispatch(updateAdminFailure());
        if (callbacks && typeof callbacks.failure === 'function')
          callbacks.failure();
      }
    } catch (error) {
      dispatch(updateAdminFailure());
      if (callbacks && typeof callbacks.failure === 'function')
        callbacks.failure(error);
    }
  };
}

// Delete admin
function deleteAdminRequest() {
  return {
    type: adminsTypes.DELETE_ADMIN_REQUEST,
  };
}
function deleteAdminSuccess(payload) {
  return {
    type: adminsTypes.DELETE_ADMIN_SUCCESS,
    payload,
  };
}
function deleteAdminFailure() {
  return {
    type: adminsTypes.DELETE_ADMIN_FAILURE,
  };
}
function deleteAdmin(dispatch) {
  return async (id, callbacks) => {
    dispatch(deleteAdminRequest());
    try {
      const response = await fetchAPI({
        method: 'DELETE',
        endpoints: `/admins/${id}`,
      });
      if (response.status === 200) {
        dispatch(deleteAdminSuccess(response.data));
        getAdmins(dispatch)(callbacks);
      } else {
        dispatch(deleteAdminFailure());
        if (callbacks && typeof callbacks.failure === 'function')
          callbacks.failure();
      }
    } catch (error) {
      dispatch(deleteAdminFailure());
      if (callbacks && typeof callbacks.failure === 'function')
        callbacks.failure(error);
    }
  };
}

function logout(dispatch) {
  return () => {
    dispatch({
      type: adminsTypes.LOGOUT_ADMINS,
    });
    dispatch({
      type: postsTypes.LOGOUT_POSTS,
    });
    dispatch({
      type: productTypesTypes.LOGOUT_productTypeS,
    });
  };
}

export { login, logout, getAdmins, createAdmin, deleteAdmin, updateAdmin };
