import { call, put, takeLatest } from 'redux-saga/effects';
import { orderByHeight, toAppCoin } from '../../utils/tx';
import {
  getAddress,
  getAddressSuccess,
  getAddressFailure,
  getTransactionsFromAddressSuccess,
  getTransactionsFromAddressFailure,
} from './reducer';
import {
  getAddressService,
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
    const data = yield call(getTransactionsFromAddressService, address);
    const formattedData = data.map(toAppCoin);
    const txs = yield call(orderByHeight, formattedData);
    yield put(getTransactionsFromAddressSuccess(txs.slice(0, 10))); // TODO: remove slice from here
  } catch (err) {
    yield put(getTransactionsFromAddressFailure(err.message));
  }
}

function* mySaga() {
  yield takeLatest(getAddress.type, handleGetAddress);
}

export default mySaga;
