import {
  GET_EMPLOYEE_FAILURE,
  GET_EMPLOYEE_REQUEST,
  GET_EMPLOYEE_SUCCESS,
  DEFAULT_CALLBACK,
  CREATE_EMPLOYEE_REQUEST,
  CREATE_EMPLOYEE_FAILURE,
  CREATE_EMPLOYEE_SUCCESS,
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
          payload: response.data,
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
        endpoints: `hub`,
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
