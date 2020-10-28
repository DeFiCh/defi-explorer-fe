import { call, put, select, takeLatest } from 'redux-saga/effects';
import { BLOCK_PAGE_TRANSACTIONS_LIMIT } from '../../constants';
import {
  getBlockFromHash,
  getBlockFromHashFailure,
  getBlockFromHashSuccess,
  getTransactionsFromHashSuccess,
  getTransactionsFromHashFailure,
  startPagination,
} from './reducer';
import {
  getBlockFromHashService,
  getTransactionsFromBlockHashService,
  getConfirmations,
} from './services';

export function* handleGetBlockFromHash(action) {
  const { blockHash } = action.payload;
  try {
    const data = yield call(getBlockFromHashService, blockHash);
    data.confirmations = yield call(getConfirmations, data.height);
    yield put(getBlockFromHashSuccess(data));
    yield call(paginationGetTransactionsFromHash, action);
  } catch (err) {
    yield put(getBlockFromHashFailure(err.message));
  }
}

export function* paginationGetTransactionsFromHash(action) {
  const { blockHash, pageSize = 10, pageNumber = 0 } = action.payload;
  try {
    const data = yield call(getTransactionsFromBlockHashService, {
      blockHash,
      skip: pageNumber * pageSize,
      limit: pageSize,
    });
    yield put(getTransactionsFromHashSuccess(data));
  } catch (err) {
    yield put(getTransactionsFromHashFailure(err.message));
  }
}

function* mySaga() {
  yield takeLatest(getBlockFromHash.type, handleGetBlockFromHash);
  yield takeLatest(startPagination.type, paginationGetTransactionsFromHash);
}

export default mySaga;
