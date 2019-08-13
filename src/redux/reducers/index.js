import { combineReducers } from 'redux';

import posts from './posts';
import admins from './admins';
import categories from './categories';
import productTypes from './productTypes';

export default combineReducers({
  posts,
  admins,
  categories,
  productTypes,
});
