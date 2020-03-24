import {
  TRANSFER_CARMODEL_FAILURE,
  TRANSFER_CARMODEL_REQUEST,
  TRANSFER_CARMODEL_SUCCESS,
  TRANSFER_CAR_FAILURE,
  TRANSFER_CAR_REQUEST,
  TRANSFER_CAR_SUCCESS,
  DEFAULT_CALLBACK,
} from '../constants';
import fetchAPI from '../../utils/service';

export function transferCar(dispatch) {
  return async (data, callbacks = DEFAULT_CALLBACK) => {
    console.log(data);
    dispatch({
      type: TRANSFER_CAR_REQUEST,
    });
    try {
      const response = await fetchAPI({
        method: 'put',
        endpoints: `car/transfer`,
        data,
      });
      if (response.status === 200) {
        dispatch({
          type: TRANSFER_CAR_SUCCESS,
          payload: response.data,
        });
        callbacks.success();
      } else {
        dispatch({ type: TRANSFER_CAR_FAILURE });
        callbacks.failure();
      }
    } catch (error) {
      dispatch({ type: TRANSFER_CAR_FAILURE });
      callbacks.failure(error);
    }
  };
}
