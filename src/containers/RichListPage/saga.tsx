import {
  call,
  cancel,
  cancelled,
  delay,
  fork,
  put,
  take,
  takeLatest,
} from 'redux-saga/effects';
import { RICH_LIST_INTERVAL } from '../../constants';
import {
  fetchRichListStarted,
  fetchRichListSuccess,
  fetchRichListFailure,
  startRichListCron,
  stopRichListCron,
  startPagination,
} from './reducer';
import { handleRichList } from './services';

function* fetchRichListStartedSaga(action) {
  yield put(startRichListCron(action.payload));
}

function* fetchRichListData(action) {
  const { pageno, pagesize } = action.payload;
  const queryParams = {
    pageno,
    pagesize,
  };
  try {
    while (true) {
      const { data } = yield call(handleRichList, queryParams);
      yield put(fetchRichListSuccess(data));
      yield delay(RICH_LIST_INTERVAL);
    }
  } catch (err) {
    if (yield cancelled()) {
      yield put(fetchRichListFailure(err.message));
    }
  } finally {
    if (yield cancelled()) {
      console.log('syncSTop', pageno);
    }
  }
}

function* cronJob(action) {
  while (true) {
    const bgSyncTask = yield fork(fetchRichListData, action);
    yield take(stopRichListCron);
    yield cancel(bgSyncTask);
  }
}

function* handlePagination(action) {
  yield put(stopRichListCron({}));
  yield delay(500);
  yield put(startRichListCron(action.payload));
}

function* mySaga() {
  yield takeLatest(fetchRichListStarted.type, fetchRichListStartedSaga);
  yield takeLatest(startRichListCron.type, cronJob);
  yield takeLatest(startPagination.type, handlePagination);
}

export default mySaga;
