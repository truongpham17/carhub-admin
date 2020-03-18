import {
  GET_EMPLOYEE_FAILURE,
  GET_EMPLOYEE_REQUEST,
  GET_EMPLOYEE_SUCCESS,
  DEFAULT_CALLBACK,
  CREATE_EMPLOYEE_REQUEST,
  CREATE_EMPLOYEE_FAILURE,
  CREATE_EMPLOYEE_SUCCESS,
  UPDATE_EMPLOYEE_REQUEST,
  UPDATE_EMPLOYEE_FAILURE,
  UPDATE_EMPLOYEE_SUCCESS,
  GET_EMPLOYEE_DETAIL_REQUEST,
  GET_EMPLOYEE_DETAIL_FAILURE,
  GET_EMPLOYEE_DETAIL_SUCCESS,
} from '../constants';
import fetchAPI from '../../utils/service';

export function getEmployeeList(dispatch) {
  return async (id, callbacks = DEFAULT_CALLBACK) => {
    dispatch({
      type: GET_EMPLOYEE_REQUEST,
    });
    try {
      const response = await fetchAPI({
        method: 'get',
        endpoints: 'employee',
      });
      if (response.status === 200) {
        dispatch({
          type: GET_EMPLOYEE_SUCCESS,
          payload: response.data.employees,
        });
        callbacks.success();
      } else {
        dispatch({ type: GET_EMPLOYEE_FAILURE });
        callbacks.failure();
      }
    } catch (error) {
      dispatch({ type: GET_EMPLOYEE_FAILURE });
      callbacks.failure(error);
    }
  };
}

export function createEmployee(dispatch) {
  return async (data, callbacks = DEFAULT_CALLBACK) => {
    dispatch({
      type: CREATE_EMPLOYEE_REQUEST,
    });
    try {
      const response = await fetchAPI({
        method: 'post',
        endpoints: `employee`,
        data,
      });
      if (response.status === 201) {
        dispatch({
          type: CREATE_EMPLOYEE_SUCCESS,
          payload: response.data,
        });
        callbacks.success();
      } else {
        dispatch({ type: CREATE_EMPLOYEE_FAILURE });
        callbacks.failure();
      }
    } catch (error) {
      dispatch({ type: CREATE_EMPLOYEE_FAILURE });
      callbacks.failure(error);
    }
  };
}

export function updateEmployee(dispatch) {
  return async ({ data, _id }, callbacks = DEFAULT_CALLBACK) => {
    dispatch({
      type: UPDATE_EMPLOYEE_REQUEST,
    });
    console.log({ data, _id });
    try {
      const response = await fetchAPI({
        method: 'patch',
        endpoints: `employee/${_id}`,
        data,
      });
      if (response.status === 200) {
        dispatch({
          type: UPDATE_EMPLOYEE_SUCCESS,
          payload: response.data,
        });
        callbacks.success();
      } else {
        dispatch({ type: UPDATE_EMPLOYEE_FAILURE });
        callbacks.failure();
      }
    } catch (error) {
      dispatch({ type: UPDATE_EMPLOYEE_FAILURE });
      callbacks.failure(error);
    }
  };
}

export function getEmployeeDetail(dispatch) {
  return async (id, callbacks = DEFAULT_CALLBACK) => {
    dispatch({
      type: GET_EMPLOYEE_DETAIL_REQUEST,
    });
    try {
      const response = await fetchAPI({
        method: 'get',
        endpoints: `employee/${id}`,
      });
      if (response.status === 200) {
        dispatch({
          type: GET_EMPLOYEE_DETAIL_SUCCESS,
          payload: response.data,
        });
        callbacks.success();
      } else {
        dispatch({ type: GET_EMPLOYEE_DETAIL_FAILURE });
        callbacks.failure();
      }
    } catch (error) {
      dispatch({ type: GET_EMPLOYEE_DETAIL_FAILURE });
      callbacks.failure(error);
    }
  };
}

export function deleteEmployee(dispatch) {
  return async ({ data, _id }, callbacks = DEFAULT_CALLBACK) => {
    dispatch({
      type: UPDATE_EMPLOYEE_REQUEST,
    });
    try {
      data.isActive = false;
      const response = await fetchAPI({
        method: 'patch',
        endpoints: `employee/${data._id}`,
        data,
      });
      if (response.status === 200) {
        dispatch({
          type: UPDATE_EMPLOYEE_SUCCESS,
          payload: response.data,
        });
        callbacks.success();
      } else {
        dispatch({ type: UPDATE_EMPLOYEE_FAILURE });
        callbacks.failure();
      }
    } catch (error) {
      dispatch({ type: UPDATE_EMPLOYEE_FAILURE });
      callbacks.failure(error);
    }
  };
}
