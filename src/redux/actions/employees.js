import fetchAPI from '../../utils/service';

import { employeesTypes } from '../action-types';

// Get employees
function getEmployeesRequest() {
  return {
    type: employeesTypes.GET_EMPLOYEES_REQUEST,
  };
}
function getEmployeesSuccess(payload) {
  return {
    type: employeesTypes.GET_EMPLOYEES_SUCCESS,
    payload,
  };
}
function getEmployeesFailure() {
  return {
    type: employeesTypes.GET_EMPLOYEES_FAILURE,
  };
}
function getEmployees(dispatch) {
  return async callbacks => {
    dispatch(getEmployeesRequest());
    try {
      const response = await fetchAPI({
        method: 'GET',
        endpoints: '/employees',
      });
      if (response.status === 200) {
        dispatch(getEmployeesSuccess(response.data.employees));
        if (callbacks && typeof callbacks.failure === 'function')
          callbacks.success();
      } else {
        dispatch(getEmployeesFailure());
        if (callbacks && typeof callbacks.failure === 'function')
          callbacks.failure();
      }
    } catch (error) {
      dispatch(getEmployeesFailure());
      if (callbacks && typeof callbacks.failure === 'function')
        callbacks.failure(error);
    }
  };
}

// Create employee
function createEmployeeRequest() {
  return {
    type: employeesTypes.CREATE_EMPLOYEE_REQUEST,
  };
}
function createEmployeeSuccess(payload) {
  return {
    type: employeesTypes.CREATE_EMPLOYEE_SUCCESS,
    payload,
  };
}
function createEmployeeFailure() {
  return {
    type: employeesTypes.CREATE_EMPLOYEE_FAILURE,
  };
}
function createEmployee(dispatch) {
  return async (data, callbacks) => {
    dispatch(createEmployeeRequest());
    try {
      const response = await fetchAPI({
        method: 'POST',
        endpoints: '/employees',
        data,
      });
      if (response.status === 201) {
        dispatch(createEmployeeSuccess(response.data));
        getEmployees(dispatch)(callbacks);
      } else {
        dispatch(createEmployeeFailure());
        if (callbacks && typeof callbacks.failure === 'function')
          callbacks.failure();
      }
    } catch (error) {
      dispatch(createEmployeeFailure());
      if (callbacks && typeof callbacks.failure === 'function')
        callbacks.failure(error);
    }
  };
}

// Update employee
function updateEmployeeRequest() {
  return {
    type: employeesTypes.UPDATE_EMPLOYEE_REQUEST,
  };
}
function updateEmployeeSuccess(payload) {
  return {
    type: employeesTypes.UPDATE_EMPLOYEE_SUCCESS,
    payload,
  };
}
function updateEmployeeFailure() {
  return {
    type: employeesTypes.UPDATE_EMPLOYEE_FAILURE,
  };
}
function updateEmployee(dispatch) {
  return async (id, data, callbacks) => {
    dispatch(updateEmployeeRequest());
    try {
      const response = await fetchAPI({
        method: 'PATCH',
        endpoints: `/employees/${id}`,
        data,
      });
      if (response.status === 200) {
        dispatch(updateEmployeeSuccess(response.data));
        getEmployees(dispatch)(callbacks);
      } else {
        dispatch(updateEmployeeFailure());
        if (callbacks && typeof callbacks.failure === 'function')
          callbacks.failure();
      }
    } catch (error) {
      dispatch(updateEmployeeFailure());
      if (callbacks && typeof callbacks.failure === 'function')
        callbacks.failure(error);
    }
  };
}

// Delete employee
function deleteEmployeeRequest() {
  return {
    type: employeesTypes.DELETE_EMPLOYEE_REQUEST,
  };
}
function deleteEmployeeSuccess(payload) {
  return {
    type: employeesTypes.DELETE_EMPLOYEE_SUCCESS,
    payload,
  };
}
function deleteEmployeeFailure() {
  return {
    type: employeesTypes.DELETE_EMPLOYEE_FAILURE,
  };
}
function deleteEmployee(dispatch) {
  return async (id, callbacks) => {
    dispatch(deleteEmployeeRequest());
    try {
      const response = await fetchAPI({
        method: 'DELETE',
        endpoints: `/employees/${id}`,
      });
      if (response.status === 200) {
        dispatch(deleteEmployeeSuccess(response.data));
        getEmployees(dispatch)(callbacks);
      } else {
        dispatch(deleteEmployeeFailure());
        if (callbacks && typeof callbacks.failure === 'function')
          callbacks.failure();
      }
    } catch (error) {
      dispatch(deleteEmployeeFailure());
      if (callbacks && typeof callbacks.failure === 'function')
        callbacks.failure(error);
    }
  };
}

function logoutEmployees() {
  return {
    type: employeesTypes.LOGOUT_EMPLOYEES,
  };
}

export {
  getEmployees,
  createEmployee,
  deleteEmployee,
  updateEmployee,
  logoutEmployees,
};
