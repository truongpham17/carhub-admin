import { combineReducers } from 'redux';

import companies from './companies';
import employees from './employees';
import admins from './admins';

export default combineReducers({
  companies,
  employees,
  admins,
});
