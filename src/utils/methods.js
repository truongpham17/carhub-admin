import store from '../redux/store';

import fetchAPI from './service';
import { logout } from '../redux/actions';

export function auth() {
  try {
    const { admins } = store.getState();

    // fetchAPI({
    //   method: 'GET',
    //   endpoints: `account/${admins.info._id}`,
    // }).catch(error => {
    //   // console.log(JSON.stringify(error));
    //   if (error.toString().includes('401')) {
    //     window.location.href = '/login';
    //     logout(store.dispatch)();
    //   }
    // });

    // return typeof admins.info.token === 'string';
    return true;
    // return true;
  } catch (e) {
    return false;
  }
}
