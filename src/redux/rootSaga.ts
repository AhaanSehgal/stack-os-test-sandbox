import { all, fork } from 'redux-saga/effects';

import appStoreSaga from './app-store/sagas';
import drawerSaga from './drawer/sagas';
import swapSaga from './swap/sagas';

export default function* rootSaga() {
  yield all([fork(appStoreSaga)]);
  yield all([fork(drawerSaga)]);
  yield all([fork(swapSaga)]);
}
