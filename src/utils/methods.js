import store from '../redux/store';

export function auth() {
  try {
    return typeof store.getState().admin.info.token === 'string';
  } catch (e) {
    return false;
  }
}
