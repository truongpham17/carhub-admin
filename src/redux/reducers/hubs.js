import {
  GET_HUB_FAILURE,
  GET_HUB_REQUEST,
  GET_HUB_SUCCESS,
  CREATE_HUB_FAILURE,
  CREATE_HUB_REQUEST,
  CREATE_HUB_SUCCESS,
  SET_SELECTED_HUB_ID,
  GET_HUB_DETAIL_FAILURE,
  GET_HUB_DETAIL_REQUEST,
  GET_HUB_DETAIL_SUCCESS,
  UPDATE_HUB_FAILURE,
  UPDATE_HUB_REQUEST,
  UPDATE_HUB_SUCCESS,
} from '../constants/hub';

const INITIAL_STATE = {
  hubs: [],
  total: 0,
  loading: false,
  selectedId: null,
  selectedHub: {},
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
    case SET_SELECTED_HUB_ID:
      return { ...state, selectedId: action.payload };
    case GET_HUB_DETAIL_REQUEST:
      return { ...state, loading: true };
    case GET_HUB_DETAIL_SUCCESS:
      return { ...state, loading: false, selectedHub: action.payload };
    case GET_HUB_DETAIL_FAILURE:
      return { ...state, loading: false };
    case UPDATE_HUB_REQUEST:
      return { ...state, loading: true };
    case UPDATE_HUB_SUCCESS:
      return {
        ...state,
        loading: false,
        hubs: state.hubs.map(hub => {
          if (hub._id === action.payload._id) return action.payload;
          return hub;
        }),
      };
    case UPDATE_HUB_FAILURE:
      return { ...state, loading: false };
    default:
      return { ...state };
  }
};
