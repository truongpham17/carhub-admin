import {
  GET_TRANSACTION_FAILURE,
  GET_TRANSACTION_REQUEST,
  GET_TRANSACTION_SUCCESS,
  DEFAULT_CALLBACK,
} from '../constants';
import fetchAPI from '../../utils/service';

export function getTransactionList(dispatch) {
  return async (callbacks = DEFAULT_CALLBACK) => {
    dispatch({
      type: GET_TRANSACTION_REQUEST,
    });
    try {
      const response = await fetchAPI({
        method: 'get',
        endpoints: 'transaction',
      });
      if (response.status === 200) {
        dispatch({
          type: GET_TRANSACTION_SUCCESS,
          payload: response.data,
        });
        callbacks.success();
      } else {
        dispatch({ type: GET_TRANSACTION_FAILURE });
        callbacks.failure();
      }
    } catch (error) {
      dispatch({ type: GET_TRANSACTION_FAILURE });
      callbacks.failure(error);
    }
  };
}
