import {
  GET_HUB_FAILURE,
  GET_HUB_REQUEST,
  GET_HUB_SUCCESS,
  DEFAULT_CALLBACK,
  CREATE_HUB_REQUEST,
  CREATE_HUB_FAILURE,
  CREATE_HUB_SUCCESS,
} from '../constants';
import fetchAPI from '../../utils/service';

export function getHubList(dispatch) {
  return async (id, callbacks = DEFAULT_CALLBACK) => {
    dispatch({
      type: GET_HUB_REQUEST,
    });
    try {
      const response = await fetchAPI({
        method: 'get',
        endpoints: `hub`,
      });
      if (response.status === 200) {
        dispatch({
          type: GET_HUB_SUCCESS,
          payload: response.data,
        });
        callbacks.success();
      } else {
        dispatch({ type: GET_HUB_FAILURE });
        callbacks.failure();
      }
    } catch (error) {
      dispatch({ type: GET_HUB_FAILURE });
      callbacks.failure(error);
    }
  };
}

export function createHub(dispatch) {
  return async (data, callbacks = DEFAULT_CALLBACK) => {
    dispatch({
      type: CREATE_HUB_REQUEST,
    });
    try {
      const response = await fetchAPI({
        method: 'post',
        endpoints: `hub`,
        data,
      });
      if (response.status === 201) {
        dispatch({
          type: CREATE_HUB_SUCCESS,
          payload: response.data,
        });
        callbacks.success();
      } else {
        dispatch({ type: CREATE_HUB_FAILURE });
        callbacks.failure();
      }
    } catch (error) {
      dispatch({ type: CREATE_HUB_FAILURE });
      callbacks.failure(error);
    }
  };
}
