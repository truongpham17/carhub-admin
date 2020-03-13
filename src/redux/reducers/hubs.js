import {
  GET_HUB_FAILURE,
  GET_HUB_REQUEST,
  GET_HUB_SUCCESS,
  CREATE_HUB_FAILURE,
  CREATE_HUB_REQUEST,
  CREATE_HUB_SUCCESS,
} from '../constants/hub';

const INITIAL_STATE = {
  hubs: [],
  total: 0,
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_HUB_REQUEST:
      return { ...state, loading: true };
    case GET_HUB_SUCCESS:
      return { ...state, loading: false, ...action.payload };
    case GET_HUB_FAILURE:
      return { ...state, loading: false };
    case CREATE_HUB_REQUEST:
      return { ...state, loading: true };
    case CREATE_HUB_SUCCESS:
      return {
        ...state,
        loading: false,
        hubs: [...state.hubs, action.payload],
      };
    case CREATE_HUB_FAILURE:
      return { ...state, loading: false };
    default:
      return { ...state };
  }
};
