import {
  GET_EMPLOYEE_FAILURE,
  GET_EMPLOYEE_REQUEST,
  GET_EMPLOYEE_SUCCESS,
  CREATE_EMPLOYEE_FAILURE,
  CREATE_EMPLOYEE_REQUEST,
  CREATE_EMPLOYEE_SUCCESS,
} from '../constants/employee';

const INITIAL_STATE = {
  employees: [],
  total: 0,
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_EMPLOYEE_REQUEST:
      return { ...state, loading: true };
    case GET_EMPLOYEE_SUCCESS:
      return { ...state, loading: false, ...action.payload };
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
    default:
      return { ...state };
  }
};
