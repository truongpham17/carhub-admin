import { COMPANIES_INITIAL_STATE } from '../initial-states';
import { companiesTypes } from '../action-types';

export default (state = COMPANIES_INITIAL_STATE, action) => {
  switch (action.type) {
    case companiesTypes.GET_COMPANIES_REQUEST:
      return {
        ...state,
        getCompaniesLoading: true,
      };
    case companiesTypes.GET_COMPANIES_SUCCESS:
      return {
        ...state,
        getCompaniesLoading: false,
        list: action.payload,
      };
    case companiesTypes.GET_COMPANIES_FAILURE:
      return {
        ...state,
        getCompaniesLoading: false,
      };
    case companiesTypes.CREATE_COMPANY_REQUEST:
      return {
        ...state,
        createCompanyLoading: true,
      };
    case companiesTypes.CREATE_COMPANY_SUCCESS:
      return {
        ...state,
        createCompanyLoading: false,
      };
    case companiesTypes.CREATE_COMPANY_FAILURE:
      return {
        ...state,
        createCompanyLoading: false,
      };
    case companiesTypes.DELETE_COMPANY_REQUEST:
      return {
        ...state,
        deleteCompanyLoading: true,
      };
    case companiesTypes.DELETE_COMPANY_SUCCESS:
      return {
        ...state,
        deleteCompanyLoading: false,
        list: state.list.filter(company => company._id !== action.payload._id),
      };
    case companiesTypes.DELETE_COMPANY_FAILURE:
      return {
        ...state,
        deleteCompanyLoading: false,
      };
    case companiesTypes.UPDATE_COMPANY_REQUEST:
      return {
        ...state,
        updateCompanyLoading: true,
      };
    case companiesTypes.UPDATE_COMPANY_SUCCESS:
      return {
        ...state,
        updateCompanyLoading: false,
      };
    case companiesTypes.UPDATE_COMPANY_FAILURE:
      return {
        ...state,
        updateCompanyLoading: false,
      };
    case companiesTypes.LOGOUT_COMPANIES:
      return COMPANIES_INITIAL_STATE;
    default:
      return state;
  }
};
