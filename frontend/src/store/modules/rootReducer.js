import { combineReducers } from 'redux';

import auth from './auth/reducer';
import user from './user/reducer';

// Combina todos os Reducers
export default combineReducers({
  auth,
  user,
});
