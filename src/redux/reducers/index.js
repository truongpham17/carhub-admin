import { combineReducers } from 'redux';

import admin from './admin';
import companies from './companies';
import employees from './employees';

export default combineReducers({
  admin,
  companies,
  employees,
});
