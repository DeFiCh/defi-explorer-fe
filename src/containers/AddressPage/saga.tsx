import { call, put, takeLatest } from 'redux-saga/effects';
import { orderByHeight, toAppCoin } from '../../utils/tx';
import {
  getAddress,
  getAddressSuccess,
  getAddressFailure,
  getTransactionsFromAddressSuccess,
  getTransactionsFromAddressFailure,
  startPaginateTransactionsFromAddress,
  startPaginateTransactionsFromAddressSuccess,
  startPaginateTransactionsFromAddressFailue,
} from './reducer';
import {
  getAddressService,
  getTotalTransactionFromAddressCount,
  getTransactionsFromAddressService,
} from './services';

export function* handleGetAddress(action) {
  const { address } = action.payload;
  try {
    const data = yield call(getAddressService, address);
    yield put(getAddressSuccess(data));
    yield call(handleGetTransactionsFromAddress, action);
  } catch (err) {
    yield put(getAddressFailure(err.message));
  }
}

export function* handleGetTransactionsFromAddress(action) {
  const { address } = action.payload;
  try {
    const data = yield call(getTransactionsFromAddressService, address, {
      limit: 10,
    });
    const formattedData = data.map(toAppCoin);
    const txs = yield call(orderByHeight, formattedData);
    const { total } = yield call(getTotalTransactionFromAddressCount, address);
    yield put(
      getTransactionsFromAddressSuccess({
        txns: txs,
        total,
      })
    );
  } catch (err) {
    yield put(getTransactionsFromAddressFailure(err.message));
  }
}

export function* handleTransactionPaginationFromAddress(action) {
  const { address, pageSize, pageNumber } = action.payload;
  try {
    const data = yield call(getTransactionsFromAddressService, address, {
      skip: pageNumber * pageSize,
      limit: pageSize,
    });
    const formattedData = data.map(toAppCoin);
    const txs = yield call(orderByHeight, formattedData);
    yield put(
      startPaginateTransactionsFromAddressSuccess({
        txns: txs,
      })
    );
  } catch (err) {
    yield put(startPaginateTransactionsFromAddressFailue(err.message));
  }
}

function* mySaga() {
  yield takeLatest(getAddress.type, handleGetAddress);
  yield takeLatest(
    startPaginateTransactionsFromAddress.type,
    handleTransactionPaginationFromAddress
  );
}

export default mySaga;
