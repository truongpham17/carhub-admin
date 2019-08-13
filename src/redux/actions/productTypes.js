import fetchAPI from '../../utils/service';

import { productTypesTypes } from '../action-types';

// Get productTypes
function getProductTypesRequest() {
  return {
    type: productTypesTypes.GET_productTypeS_REQUEST,
  };
}
function getProductTypesSuccess(payload) {
  return {
    type: productTypesTypes.GET_productTypeS_SUCCESS,
    payload,
  };
}
function getProductTypesFailure() {
  return {
    type: productTypesTypes.GET_productTypeS_FAILURE,
  };
}
function getProductTypes(dispatch) {
  return async callbacks => {
    dispatch(getProductTypesRequest());
    try {
      const response = await fetchAPI({
        method: 'GET',
        endpoints: '/productTypes',
      });
      if (response.status === 200) {
        dispatch(getProductTypesSuccess(response.data));
        if (callbacks && typeof callbacks.failure === 'function')
          callbacks.success();
      } else {
        dispatch(getProductTypesFailure());
        if (callbacks && typeof callbacks.failure === 'function')
          callbacks.failure();
      }
    } catch (error) {
      dispatch(getProductTypesFailure());
      if (callbacks && typeof callbacks.failure === 'function')
        callbacks.failure(error);
    }
  };
}

// Create productType
function createProductTypeRequest() {
  return {
    type: productTypesTypes.CREATE_productType_REQUEST,
  };
}
function createProductTypeSuccess(payload) {
  return {
    type: productTypesTypes.CREATE_productType_SUCCESS,
    payload,
  };
}
function createProductTypeFailure() {
  return {
    type: productTypesTypes.CREATE_productType_FAILURE,
  };
}
function createProductType(dispatch) {
  return async (data, callbacks) => {
    dispatch(createProductTypeRequest());
    try {
      const response = await fetchAPI({
        method: 'POST',
        endpoints: '/productTypes',
        data,
      });
      if (response.status === 201) {
        dispatch(createProductTypeSuccess(response.data));
        getProductTypes(dispatch)(callbacks);
      } else {
        dispatch(createProductTypeFailure());
        if (callbacks && typeof callbacks.failure === 'function')
          callbacks.failure();
      }
    } catch (error) {
      dispatch(createProductTypeFailure());
      if (callbacks && typeof callbacks.failure === 'function')
        callbacks.failure(error);
    }
  };
}

// Update productType
function updateProductTypeRequest() {
  return {
    type: productTypesTypes.UPDATE_productType_REQUEST,
  };
}
function updateProductTypeSuccess(payload) {
  return {
    type: productTypesTypes.UPDATE_productType_SUCCESS,
    payload,
  };
}
function updateProductTypeFailure() {
  return {
    type: productTypesTypes.UPDATE_productType_FAILURE,
  };
}
function updateProductType(dispatch) {
  return async (id, data, callbacks) => {
    dispatch(updateProductTypeRequest());
    try {
      const response = await fetchAPI({
        method: 'PATCH',
        endpoints: `/productTypes/${id}`,
        data,
      });
      if (response.status === 200) {
        dispatch(updateProductTypeSuccess(response.data));
        getProductTypes(dispatch)(callbacks);
      } else {
        dispatch(updateProductTypeFailure());
        if (callbacks && typeof callbacks.failure === 'function')
          callbacks.failure();
      }
    } catch (error) {
      dispatch(updateProductTypeFailure());
      if (callbacks && typeof callbacks.failure === 'function')
        callbacks.failure(error);
    }
  };
}

// Delete productType
function deleteProductTypeRequest() {
  return {
    type: productTypesTypes.DELETE_productType_REQUEST,
  };
}
function deleteProductTypeSuccess(payload) {
  return {
    type: productTypesTypes.DELETE_productType_SUCCESS,
    payload,
  };
}
function deleteProductTypeFailure() {
  return {
    type: productTypesTypes.DELETE_productType_FAILURE,
  };
}
function deleteProductType(dispatch) {
  return async (id, callbacks) => {
    dispatch(deleteProductTypeRequest());
    try {
      const response = await fetchAPI({
        method: 'DELETE',
        endpoints: `/productTypes/${id}`,
      });
      if (response.status === 200) {
        dispatch(deleteProductTypeSuccess(response.data));
        getProductTypes(dispatch)(callbacks);
      } else {
        dispatch(deleteProductTypeFailure());
        if (callbacks && typeof callbacks.failure === 'function')
          callbacks.failure();
      }
    } catch (error) {
      dispatch(deleteProductTypeFailure());
      if (callbacks && typeof callbacks.failure === 'function')
        callbacks.failure(error);
    }
  };
}

function logoutproductTypes() {
  return {
    type: productTypesTypes.LOGOUT_productTypeS,
  };
}

export {
  getProductTypes,
  createProductType,
  deleteProductType,
  updateProductType,
  logoutproductTypes,
};
