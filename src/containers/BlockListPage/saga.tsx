import { call, put, select, takeLatest } from 'redux-saga/effects';
import {
  fetchBlocksListStarted,
  fetchBlocksListSuccess,
  fetchBlocksListFailure,
  startPagination,
  startPaginationFailure,
  startPaginationSuccess,
} from './reducer';
import { handleBlockList } from './services';

function* fetchBlocksListStartedSaga(action) {
  const { anchorsOnly, pageSize } = action.payload;
  try {
    const queryParams = {
      limit: pageSize,
      anchorsOnly,
    };
    const { data } = yield call(handleBlockList, queryParams);
    yield put(fetchBlocksListSuccess(data));
  } catch (err) {
    yield put(fetchBlocksListFailure(err.message));
  }
}

function* fetchStartPaginationSaga(action) {
  const { total } = yield select((state) => state.blockListPage);
  const { pageNumber, anchorsOnly, pageSize } = action.payload;
  const since = total + 1 - (pageNumber - 1) * pageSize;
  try {
    const queryParams = {
      limit: pageSize,
      since,
      paging: 'height',
      direction: -1,
      anchorsOnly,
    };
    const { data } = yield call(handleBlockList, queryParams);
    yield put(startPaginationSuccess(data));
  } catch (err) {
    yield put(startPaginationFailure(err.message));
  }
}

function* mySaga() {
  yield takeLatest(fetchBlocksListStarted.type, fetchBlocksListStartedSaga);
  yield takeLatest(startPagination.type, fetchStartPaginationSaga);
}

export default mySaga;
