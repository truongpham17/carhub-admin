import { productTypeS_INITIAL_STATE } from '../initial-states';
import { productTypesTypes } from '../action-types';

export default (state = productTypeS_INITIAL_STATE, action) => {
  switch (action.type) {
    case productTypesTypes.GET_productTypeS_REQUEST:
      return {
        ...state,
        getProductTypesLoading: true,
      };
    case productTypesTypes.GET_productTypeS_SUCCESS:
      return {
        ...state,
        getProductTypesLoading: false,
        list: action.payload,
      };
    case productTypesTypes.GET_productTypeS_FAILURE:
      return {
        ...state,
        getProductTypesLoading: false,
      };
    case productTypesTypes.CREATE_productType_REQUEST:
      return {
        ...state,
        createProductTypeLoading: true,
      };
    case productTypesTypes.CREATE_productType_SUCCESS:
      return {
        ...state,
        createProductTypeLoading: false,
      };
    case productTypesTypes.CREATE_productType_FAILURE:
      return {
        ...state,
        createProductTypeLoading: false,
      };
    case productTypesTypes.DELETE_productType_REQUEST:
      return {
        ...state,
        deleteProductTypeLoading: true,
      };
    case productTypesTypes.DELETE_productType_SUCCESS:
      return {
        ...state,
        deleteProductTypeLoading: false,
        list: state.list.filter(
          productType => productType._id !== action.payload._id
        ),
      };
    case productTypesTypes.DELETE_productType_FAILURE:
      return {
        ...state,
        deleteProductTypeLoading: false,
      };
    case productTypesTypes.LOGOUT_productTypeS:
      return productTypeS_INITIAL_STATE;
    default:
      return state;
  }
};
