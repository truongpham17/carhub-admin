import { CategorIES_INITIAL_STATE } from '../initial-states';
import { categoriesTypes } from '../action-types';

export default (state = CategorIES_INITIAL_STATE, action) => {
  switch (action.type) {
    case categoriesTypes.GET_CategorIES_REQUEST:
      return {
        ...state,
        getCategoriesLoading: true,
      };
    case categoriesTypes.GET_CategorIES_SUCCESS:
      return {
        ...state,
        getCategoriesLoading: false,
        list: action.payload,
      };
    case categoriesTypes.GET_CategorIES_FAILURE:
      return {
        ...state,
        getCategoriesLoading: false,
      };
    case categoriesTypes.CREATE_CategorY_REQUEST:
      return {
        ...state,
        createCategoryLoading: true,
      };
    case categoriesTypes.CREATE_CategorY_SUCCESS:
      return {
        ...state,
        createCategoryLoading: false,
      };
    case categoriesTypes.CREATE_CategorY_FAILURE:
      return {
        ...state,
        createCategoryLoading: false,
      };
    case categoriesTypes.DELETE_CategorY_REQUEST:
      return {
        ...state,
        deleteCategoryLoading: true,
      };
    case categoriesTypes.DELETE_CategorY_SUCCESS:
      return {
        ...state,
        deleteCategoryLoading: false,
        list: state.list.filter(
          category => category._id !== action.payload._id
        ),
      };
    case categoriesTypes.DELETE_CategorY_FAILURE:
      return {
        ...state,
        deleteCategoryLoading: false,
      };
    case categoriesTypes.UPDATE_CategorY_REQUEST:
      return {
        ...state,
        updateCategoryLoading: true,
      };
    case categoriesTypes.UPDATE_CategorY_SUCCESS:
      return {
        ...state,
        updateCategoryLoading: false,
      };
    case categoriesTypes.UPDATE_CategorY_FAILURE:
      return {
        ...state,
        updateCategoryLoading: false,
      };
    case categoriesTypes.LOGOUT_CategorIES:
      return CategorIES_INITIAL_STATE;
    default:
      return state;
  }
};
