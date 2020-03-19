import {
  GET_TRANSACTION_FAILURE,
  GET_TRANSACTION_REQUEST,
  GET_TRANSACTION_SUCCESS,
} from '../constants/transaction';

const INITIAL_STATE = {
  transactions: [],
  total: 0,
  loading: false,
  selectedId: null,
  selectedHub: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_TRANSACTION_REQUEST:
      return { ...state, loading: true };
    case GET_TRANSACTION_SUCCESS:
      return { ...state, loading: false, ...action.payload };
    case GET_TRANSACTION_FAILURE:
      return { ...state, loading: false };
    default:
      return { ...state };
  }
};
