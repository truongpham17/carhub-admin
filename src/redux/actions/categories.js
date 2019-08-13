import fetchAPI from '../../utils/service';

import { categoriesTypes } from '../action-types';

// Get categories
function getCategoriesRequest() {
  return {
    type: categoriesTypes.GET_CategorIES_REQUEST,
  };
}
function getCategoriesSuccess(payload) {
  return {
    type: categoriesTypes.GET_CategorIES_SUCCESS,
    payload,
  };
}
function getCategoriesFailure() {
  return {
    type: categoriesTypes.GET_CategorIES_FAILURE,
  };
}
function getCategories(dispatch) {
  return async callbacks => {
    dispatch(getCategoriesRequest());
    try {
      const response = await fetchAPI({
        method: 'GET',
        endpoints: '/categories',
      });
      if (response.status === 200) {
        dispatch(getCategoriesSuccess(response.data));
        if (callbacks && typeof callbacks.failure === 'function')
          callbacks.success();
      } else {
        dispatch(getCategoriesFailure());
        if (callbacks && typeof callbacks.failure === 'function')
          callbacks.failure();
      }
    } catch (error) {
      dispatch(getCategoriesFailure());
      if (callbacks && typeof callbacks.failure === 'function')
        callbacks.failure(error);
    }
  };
}

// Create category
function createCategoryRequest() {
  return {
    type: categoriesTypes.CREATE_CategorY_REQUEST,
  };
}
function createCategorySuccess(payload) {
  return {
    type: categoriesTypes.CREATE_CategorY_SUCCESS,
    payload,
  };
}
function createCategoryFailure() {
  return {
    type: categoriesTypes.CREATE_CategorY_FAILURE,
  };
}
function createCategory(dispatch) {
  return async (data, callbacks) => {
    dispatch(createCategoryRequest());
    try {
      const response = await fetchAPI({
        method: 'POST',
        endpoints: '/categories',
        data,
      });
      if (response.status === 201) {
        dispatch(createCategorySuccess(response.data));
        getCategories(dispatch)(callbacks);
      } else {
        dispatch(createCategoryFailure());
        if (callbacks && typeof callbacks.failure === 'function')
          callbacks.failure();
      }
    } catch (error) {
      dispatch(createCategoryFailure());
      if (callbacks && typeof callbacks.failure === 'function')
        callbacks.failure(error);
    }
  };
}

// Update category
function updateCategoryRequest() {
  return {
    type: categoriesTypes.UPDATE_CategorY_REQUEST,
  };
}
function updateCategorySuccess(payload) {
  return {
    type: categoriesTypes.UPDATE_CategorY_SUCCESS,
    payload,
  };
}
function updateCategoryFailure() {
  return {
    type: categoriesTypes.UPDATE_CategorY_FAILURE,
  };
}
function updateCategory(dispatch) {
  return async (id, data, callbacks) => {
    dispatch(updateCategoryRequest());
    try {
      const response = await fetchAPI({
        method: 'PATCH',
        endpoints: `/categories/${id}`,
        data,
      });
      if (response.status === 200) {
        dispatch(updateCategorySuccess(response.data));
        getCategories(dispatch)(callbacks);
      } else {
        dispatch(updateCategoryFailure());
        if (callbacks && typeof callbacks.failure === 'function')
          callbacks.failure();
      }
    } catch (error) {
      dispatch(updateCategoryFailure());
      if (callbacks && typeof callbacks.failure === 'function')
        callbacks.failure(error);
    }
  };
}

// Delete category
function deleteCategoryRequest() {
  return {
    type: categoriesTypes.DELETE_CategorY_REQUEST,
  };
}
function deleteCategorySuccess(payload) {
  return {
    type: categoriesTypes.DELETE_CategorY_SUCCESS,
    payload,
  };
}
function deleteCategoryFailure() {
  return {
    type: categoriesTypes.DELETE_CategorY_FAILURE,
  };
}
function deleteCategory(dispatch) {
  return async (id, callbacks) => {
    dispatch(deleteCategoryRequest());
    try {
      const response = await fetchAPI({
        method: 'DELETE',
        endpoints: `/categories/${id}`,
      });
      if (response.status === 200) {
        dispatch(deleteCategorySuccess(response.data));
        getCategories(dispatch)(callbacks);
      } else {
        dispatch(deleteCategoryFailure());
        if (callbacks && typeof callbacks.failure === 'function')
          callbacks.failure();
      }
    } catch (error) {
      dispatch(deleteCategoryFailure());
      if (callbacks && typeof callbacks.failure === 'function')
        callbacks.failure(error);
    }
  };
}

function logoutCategories() {
  return {
    type: categoriesTypes.LOGOUT_CategorIES,
  };
}

export {
  getCategories,
  createCategory,
  deleteCategory,
  updateCategory,
  logoutCategories,
};
