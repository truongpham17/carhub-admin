import fetchAPI from '../../utils/service';

import { companiesTypes } from '../action-types';

// Get companies
function getCompaniesRequest() {
  return {
    type: companiesTypes.GET_COMPANIES_REQUEST,
  };
}
function getCompaniesSuccess(payload) {
  return {
    type: companiesTypes.GET_COMPANIES_SUCCESS,
    payload,
  };
}
function getCompaniesFailure() {
  return {
    type: companiesTypes.GET_COMPANIES_FAILURE,
  };
}
function getCompanies(dispatch) {
  return async callbacks => {
    dispatch(getCompaniesRequest());
    try {
      const response = await fetchAPI({
        method: 'GET',
        endpoints: '/companies',
      });
      if (response.status === 200) {
        dispatch(getCompaniesSuccess(response.data.companies));
        if (callbacks && typeof callbacks.failure === 'function')
          callbacks.success();
      } else {
        dispatch(getCompaniesFailure());
        if (callbacks && typeof callbacks.failure === 'function')
          callbacks.failure();
      }
    } catch (error) {
      dispatch(getCompaniesFailure());
      if (callbacks && typeof callbacks.failure === 'function')
        callbacks.failure(error);
    }
  };
}

// Create company
function createCompanyRequest() {
  return {
    type: companiesTypes.CREATE_COMPANY_REQUEST,
  };
}
function createCompanySuccess(payload) {
  return {
    type: companiesTypes.CREATE_COMPANY_SUCCESS,
    payload,
  };
}
function createCompanyFailure() {
  return {
    type: companiesTypes.CREATE_COMPANY_FAILURE,
  };
}
function createCompany(dispatch) {
  return async (data, callbacks) => {
    dispatch(createCompanyRequest());
    try {
      const response = await fetchAPI({
        method: 'POST',
        endpoints: '/companies',
        data,
      });
      if (response.status === 201) {
        dispatch(createCompanySuccess(response.data));
        getCompanies(dispatch)(callbacks);
      } else {
        dispatch(createCompanyFailure());
        if (callbacks && typeof callbacks.failure === 'function')
          callbacks.failure();
      }
    } catch (error) {
      dispatch(createCompanyFailure());
      if (callbacks && typeof callbacks.failure === 'function')
        callbacks.failure(error);
    }
  };
}

// Delete company
function deleteCompanyRequest() {
  return {
    type: companiesTypes.DELETE_COMPANY_REQUEST,
  };
}
function deleteCompanySuccess(payload) {
  return {
    type: companiesTypes.DELETE_COMPANY_SUCCESS,
    payload,
  };
}
function deleteCompanyFailure() {
  return {
    type: companiesTypes.DELETE_COMPANY_FAILURE,
  };
}
function deleteCompany(dispatch) {
  return async (data, callbacks) => {
    dispatch(deleteCompanyRequest());
    try {
      const response = await fetchAPI({
        method: 'DELETE',
        endpoints: `/companies/${data.id}`,
      });
      if (response.status === 200) {
        dispatch(deleteCompanySuccess(response.data));
        getCompanies(dispatch)(callbacks);
      } else {
        dispatch(deleteCompanyFailure());
        if (callbacks && typeof callbacks.failure === 'function')
          callbacks.failure();
      }
    } catch (error) {
      dispatch(deleteCompanyFailure());
      if (callbacks && typeof callbacks.failure === 'function')
        callbacks.failure(error);
    }
  };
}

function logoutCompanies() {
  return {
    type: companiesTypes.LOGOUT_COMPANIES,
  };
}

export { getCompanies, createCompany, deleteCompany, logoutCompanies };
