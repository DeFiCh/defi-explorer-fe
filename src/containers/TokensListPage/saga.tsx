import { call, put, select, takeLatest } from 'redux-saga/effects';
import {
  fetchTokensListStartedRequest,
  fetchTokensListFailureRequest,
  fetchTokensListSuccessRequest,
  startPaginationRequest,
} from './reducer';
import { handleTokenList } from './services';

function* fetchTokensListStarted(action) {
  const { anchorsOnly, pageSize } = action.payload;
  try {
    const queryParams = {
      limit: pageSize,
      anchorsOnly,
    };
    const { data } = yield call(handleTokenList, queryParams);
    yield put(fetchTokensListSuccessRequest(data));
  } catch (err) {
    yield put(fetchTokensListFailureRequest(err.message));
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
    const { data } = yield call(handleTokenList, queryParams);
    yield put(fetchTokensListSuccessRequest(data));
  } catch (err) {
    yield put(fetchTokensListFailureRequest(err.message));
  }
}

function* mySaga() {
  yield takeLatest(fetchTokensListStartedRequest.type, fetchTokensListStarted);
  yield takeLatest(startPaginationRequest.type, fetchStartPaginationSaga);
}

export default mySaga;
