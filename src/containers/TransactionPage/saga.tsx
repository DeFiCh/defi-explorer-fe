import { call, put, takeLatest } from 'redux-saga/effects';
import { toAppTx } from '../../utils/tx';
import {
  getTransactionFromTxidRequest,
  getTransactionFromTxidRequestSuccess,
  getTransactionFromTxidRequestFailure,
} from './reducer';
import {
  getConfirmations,
  getInsAndOutsFromTxId,
  handleGetTxFromTxid,
} from './services';

export function* getTransactionFromTxid(action) {
  const { txId } = action.payload;
  try {
    const { data } = yield call(handleGetTxFromTxid, txId);
    const appTx = toAppTx(data);
    const { data: inputOuputData } = yield call(
      getInsAndOutsFromTxId,
      appTx.txid
    );
    appTx.confirmations = yield call(getConfirmations, appTx.blockheight);
    yield put(
      getTransactionFromTxidRequestSuccess({
        transactions: appTx,
        output: inputOuputData.outputs,
        input: inputOuputData.inputs,
      })
    );
  } catch (err) {
    yield put(getTransactionFromTxidRequestFailure(err.message));
  }
}

function* mySaga() {
  yield takeLatest(getTransactionFromTxidRequest.type, getTransactionFromTxid);
}

export default mySaga;
