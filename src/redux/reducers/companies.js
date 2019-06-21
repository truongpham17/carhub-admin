import { COMPANIES_INITIAL_STATE } from '../initial-states';
import { companiesTypes } from '../action-types';

export default (state = COMPANIES_INITIAL_STATE, action) => {
  switch (action.type) {
    case companiesTypes.GET_COMPANIES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case companiesTypes.GET_COMPANIES_SUCCESS:
      return {
        ...state,
        loading: false,
        list: action.payload,
      };
    case companiesTypes.GET_COMPANIES_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case companiesTypes.CREATE_COMPANY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case companiesTypes.CREATE_COMPANY_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case companiesTypes.CREATE_COMPANY_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case companiesTypes.DELETE_COMPANY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case companiesTypes.DELETE_COMPANY_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case companiesTypes.DELETE_COMPANY_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case companiesTypes.LOGOUT_COMPANIES:
      return COMPANIES_INITIAL_STATE;
    default:
      return state;
  }
};
