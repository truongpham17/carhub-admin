import { ADMIN_INITIAL_STATE } from '../initial-states';
import { adminTypes } from '../action-types';

export default (state = ADMIN_INITIAL_STATE, action) => {
  switch (action.type) {
    case adminTypes.LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case adminTypes.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        info: action.payload,
      };
    case adminTypes.LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        info: null,
      };
    case adminTypes.LOGOUT:
      return ADMIN_INITIAL_STATE;
    default:
      return state;
  }
};
