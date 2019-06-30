import { EMPLOYEES_INITIAL_STATE } from '../initial-states';
import { employeesTypes } from '../action-types';

export default (state = EMPLOYEES_INITIAL_STATE, action) => {
  switch (action.type) {
    case employeesTypes.GET_EMPLOYEES_REQUEST:
      return {
        ...state,
        getEmployeesLoading: true,
      };
    case employeesTypes.GET_EMPLOYEES_SUCCESS:
      return {
        ...state,
        getEmployeesLoading: false,
        list: action.payload,
      };
    case employeesTypes.GET_EMPLOYEES_FAILURE:
      return {
        ...state,
        getEmployeesLoading: false,
      };
    case employeesTypes.CREATE_EMPLOYEE_REQUEST:
      return {
        ...state,
        createEmployeeLoading: true,
      };
    case employeesTypes.CREATE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        createEmployeeLoading: false,
      };
    case employeesTypes.CREATE_EMPLOYEE_FAILURE:
      return {
        ...state,
        createEmployeeLoading: false,
      };
    case employeesTypes.DELETE_EMPLOYEE_REQUEST:
      return {
        ...state,
        deleteEmployeeLoading: true,
      };
    case employeesTypes.DELETE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        deleteEmployeeLoading: false,
        list: state.list.filter(
          employee => employee._id !== action.payload._id
        ),
      };
    case employeesTypes.DELETE_EMPLOYEE_FAILURE:
      return {
        ...state,
        deleteEmployeeLoading: false,
      };
    case employeesTypes.LOGOUT_EMPLOYEES:
      return EMPLOYEES_INITIAL_STATE;
    default:
      return state;
  }
};
