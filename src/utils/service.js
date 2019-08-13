import axios from 'axios';

import store from '../redux/store';

import { API_URL } from './constants';

export default async ({ method = 'GET', data, headers, params, endpoints }) => {
  const myHeaders = store.getState().admins.info
    ? {
        ...headers,
        Authorization: `Bearer ${store.getState().admins.info.token}`,
      }
    : headers;
  return axios({
    method,
    url: `${API_URL}${endpoints}`,
    data,
    params,
    headers: myHeaders,
  });
};
