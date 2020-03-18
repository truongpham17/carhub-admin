import {
  GET_EMPLOYEE_FAILURE,
  GET_EMPLOYEE_REQUEST,
  GET_EMPLOYEE_SUCCESS,
  CREATE_EMPLOYEE_FAILURE,
  CREATE_EMPLOYEE_REQUEST,
  CREATE_EMPLOYEE_SUCCESS,
  UPDATE_EMPLOYEE_REQUEST,
  UPDATE_EMPLOYEE_FAILURE,
  UPDATE_EMPLOYEE_SUCCESS,
  GET_EMPLOYEE_DETAIL_REQUEST,
  GET_EMPLOYEE_DETAIL_FAILURE,
  GET_EMPLOYEE_DETAIL_SUCCESS,
} from '../constants/employee';

const INITIAL_STATE = {
  employees: [],
  total: 0,
  loading: false,
  selectedEmployee: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_EMPLOYEE_REQUEST:
      return { ...state, loading: true };
    case GET_EMPLOYEE_SUCCESS:
      return { ...state, loading: false, employees: action.payload };
    case GET_EMPLOYEE_FAILURE:
      return { ...state, loading: false };
    case CREATE_EMPLOYEE_REQUEST:
      return { ...state, loading: true };
    case CREATE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        loading: false,
        employees: [...state.employees, action.payload],
      };
    case CREATE_EMPLOYEE_FAILURE:
      return { ...state, loading: false };
    case UPDATE_EMPLOYEE_REQUEST:
      return { ...state, loading: true };
    case UPDATE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        loading: false,
        employees: state.employees.map(employee => {
          if (employee._id === action.payload._id) return action.payload;
          return employee;
        }),
      };
    case UPDATE_EMPLOYEE_FAILURE:
      return { ...state, loading: false };
    case GET_EMPLOYEE_DETAIL_REQUEST:
      return { ...state, loading: true };
    case GET_EMPLOYEE_DETAIL_SUCCESS:
      return { ...state, loading: false, selectedEmployee: action.payload };
    case GET_EMPLOYEE_DETAIL_FAILURE:
      return { ...state, loading: false };
    default:
      return { ...state };
  }
};
