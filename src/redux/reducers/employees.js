import { EMPLOYEES_INITIAL_STATE } from '../initial-states';
import { employeesTypes } from '../action-types';

export default (state = EMPLOYEES_INITIAL_STATE, action) => {
  switch (action.type) {
    case employeesTypes.GET_EMPLOYEES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case employeesTypes.GET_EMPLOYEES_SUCCESS:
      return {
        ...state,
        loading: false,
        list: action.payload,
      };
    case employeesTypes.GET_EMPLOYEES_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case employeesTypes.CREATE_EMPLOYEE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case employeesTypes.CREATE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case employeesTypes.CREATE_EMPLOYEE_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case employeesTypes.DELETE_EMPLOYEE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case employeesTypes.DELETE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case employeesTypes.DELETE_EMPLOYEE_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case employeesTypes.LOGOUT_employeeS:
      return EMPLOYEES_INITIAL_STATE;
    default:
      return state;
  }
};
