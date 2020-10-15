import { call, put, takeLatest } from 'redux-saga/effects';
import { toAppTx } from '../../utils/tx';
import {
  getTransactionFromTxidRequest,
  getTransactionFromTxidRequestSuccess,
  getTransactionFromTxidRequestFailure,
} from './reducer';
import { handleGetTxFromTxid } from './services';

export function* getTransactionFromTxid(action) {
  const { txId } = action.payload;
  try {
    const { data } = yield call(handleGetTxFromTxid, txId);
    const appTx = toAppTx(data);
    yield put(getTransactionFromTxidRequestSuccess(appTx));
  } catch (err) {
    yield put(getTransactionFromTxidRequestFailure(err.message));
  }
}

function* mySaga() {
  yield takeLatest(getTransactionFromTxidRequest.type, getTransactionFromTxid);
}

export default mySaga;
