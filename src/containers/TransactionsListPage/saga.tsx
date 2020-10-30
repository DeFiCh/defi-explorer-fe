import { call, put, takeLatest } from 'redux-saga/effects';
import { TRANSACTIONS_LIST_PAGE_LIMIT } from '../../constants';
import {
  fetchTransactionsListStarted,
  fetchTransactionsListFailure,
  fetchTransactionsListSuccess,
  startPagination,
  startPaginationFailure,
  startPaginationSuccess,
  setTotalTransactionsCount,
} from './reducer';
import { handleGetTotalTransactions, handleTransactionsList } from './services';

function* fetchTransactionsListStartedSaga(action) {
  try {
    const queryParams = {
      limit: TRANSACTIONS_LIST_PAGE_LIMIT,
    };
    const { data } = yield call(handleTransactionsList, queryParams);
    yield put(fetchTransactionsListSuccess(data));
    const { total } = yield call(handleGetTotalTransactions);
    yield put(setTotalTransactionsCount(total));
  } catch (err) {
    yield put(fetchTransactionsListFailure(err.message));
  }
}

function* fetchStartPaginationSaga(action) {
  const { pageNumber, pageSize } = action.payload;
  try {
    const queryParams = {
      skip: pageNumber * pageSize,
      limit: pageSize,
    };
    const { data } = yield call(handleTransactionsList, queryParams);
    yield put(startPaginationSuccess(data));
  } catch (err) {
    yield put(startPaginationFailure(err.message));
  }
}

function* mySaga() {
  yield takeLatest(
    fetchTransactionsListStarted.type,
    fetchTransactionsListStartedSaga
  );
  yield takeLatest(startPagination.type, fetchStartPaginationSaga);
}

export default mySaga;
