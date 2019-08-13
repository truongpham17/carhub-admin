import { combineReducers } from 'redux';

import posts from './posts';
import admins from './admins';

export default combineReducers({
  posts,
  admins,
});
