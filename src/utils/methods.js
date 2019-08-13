import store from '../redux/store';

import fetchAPI from './service';
import { logout } from '../redux/actions';

export function auth() {
  try {
    const { admins } = store.getState();

    fetchAPI({
      method: 'GET',
      endpoints: `/admins/${admins.info.admin._id}`,
    }).catch(error => {
      // console.log(JSON.stringify(error));
      if (error.toString().includes('401')) {
        window.location.href = '/login';
        logout(store.dispatch)();
      }
    });

    return typeof admins.info.token === 'string';
  } catch (e) {
    return false;
  }
}
