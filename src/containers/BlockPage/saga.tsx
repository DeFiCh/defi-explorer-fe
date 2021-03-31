import { call, put, takeLatest } from 'redux-saga/effects';
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
    const confirmationData = yield call(getConfirmations);
    data.confirmations =
      data.height >= 0 ? confirmationData - data.height : data.height;
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
    const confirmationData = yield call(getConfirmations);
    data.forEach((item) => {
      item.transactions.confirmations =
        item.transactions.blockHeight >= 0
          ? confirmationData - item.transactions.blockHeight
          : item.transactions.blockHeight;
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
