import { ADMINS_INITIAL_STATE } from '../initial-states';
import { adminsTypes } from '../action-types';

export default (state = ADMINS_INITIAL_STATE, action) => {
  switch (action.type) {
    case adminsTypes.LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case adminsTypes.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        info: action.payload,
      };
    case adminsTypes.LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        info: null,
      };
    case adminsTypes.GET_ADMINS_REQUEST:
      return {
        ...state,
        getAdminsLoading: true,
      };
    case adminsTypes.GET_ADMINS_SUCCESS:
      return {
        ...state,
        getAdminsLoading: false,
        list: action.payload,
      };
    case adminsTypes.GET_ADMINS_FAILURE:
      return {
        ...state,
        getAdminsLoading: false,
      };
    case adminsTypes.CREATE_ADMIN_REQUEST:
      return {
        ...state,
        createAdminLoading: true,
      };
    case adminsTypes.CREATE_ADMIN_SUCCESS:
      return {
        ...state,
        createAdminLoading: false,
      };
    case adminsTypes.CREATE_ADMIN_FAILURE:
      return {
        ...state,
        createAdminLoading: false,
      };
    case adminsTypes.DELETE_ADMIN_REQUEST:
      return {
        ...state,
        deleteAdminLoading: true,
      };
    case adminsTypes.DELETE_ADMIN_SUCCESS:
      return {
        ...state,
        deleteAdminLoading: false,
        list: state.list.filter(admin => admin._id !== action.payload._id),
      };
    case adminsTypes.DELETE_ADMIN_FAILURE:
      return {
        ...state,
        deleteAdminLoading: false,
      };
    case adminsTypes.LOGOUT_ADMINS:
      return ADMINS_INITIAL_STATE;
    default:
      return state;
  }
};
