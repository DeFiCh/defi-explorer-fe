import { call, put, select, takeLatest } from 'redux-saga/effects';
import { BLOCKS_LIST_PAGE_LIMIT } from '../../constants';
import {
  fetchTransactionsListStarted,
  fetchTransactionsListFailure,
  fetchTransactionsListSuccess,
  startPagination,
  startPaginationFailure,
  startPaginationSuccess,
} from './reducer';
import { handleBlockList } from './services';

function* fetchBlocksListStartedSaga() {
  try {
    const queryParams = {
      limit: BLOCKS_LIST_PAGE_LIMIT,
      anchorsOnly: false,
    };
    const { data } = yield call(handleBlockList, queryParams);
    yield put(fetchTransactionsListFailure(data));
  } catch (err) {
    yield put(fetchTransactionsListSuccess(err.message));
  }
}

function* fetchStartPaginationSaga(action) {
  const { total } = yield select((state) => state.blockListPage);
  const { pageNumber } = action.payload;
  const limit = BLOCKS_LIST_PAGE_LIMIT;
  const since = total - (pageNumber - 1) * limit;
  try {
    const queryParams = {
      limit,
      since,
      paging: 'height',
      direction: -1,
      anchorsOnly: false,
    };
    const { data } = yield call(handleBlockList, queryParams);
    yield put(startPaginationSuccess(data));
  } catch (err) {
    yield put(startPaginationFailure(err.message));
  }
}

function* mySaga() {
  yield takeLatest(
    fetchTransactionsListStarted.type,
    fetchBlocksListStartedSaga
  );
  yield takeLatest(startPagination.type, fetchStartPaginationSaga);
}

export default mySaga;
