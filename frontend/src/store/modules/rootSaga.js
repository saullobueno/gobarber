import { all } from 'redux-saga/effects';

import auth from './auth/sagas';
import user from './user/sagas';

// Combina todos os Sagas
export default function* rootSaga() {
  return yield all([auth, user]);
}
