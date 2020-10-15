import { actionChannel, all, call, put, take } from 'redux-saga/effects';
import {
  fetchNewTxnIpOpDataRequest,
  fetchNewTxnIpOpDataRequestSuccess,
  fetchNewTxnIpOpDataRequestFailure,
  fetchTransactionsDataRequestSuccess,
  fetchTransactionsDataRequestFailure,
} from './reducer';
import {
  getConfirmations,
  getInsAndOutsFromTxId,
  getTransactionsFromTxid,
} from './services';

function* fetchNewTxnData() {
  const requestChan = yield actionChannel(fetchNewTxnIpOpDataRequest.type);
  while (true) {
    const action = yield take(requestChan);
    yield call(prepareConfirmationsData, action);
  }
}

function* prepareTxnsData(action) {
  const txId = action.payload;
  try {
    const { data } = yield call(getInsAndOutsFromTxId, action.payload);
    yield put(
      fetchNewTxnIpOpDataRequestSuccess({
        txId,
        data,
      })
    );
  } catch (err) {
    yield put(
      fetchNewTxnIpOpDataRequestFailure({
        txId,
        data: err.message,
      })
    );
  }
}

function* prepareConfirmationsData(action) {
  const txId = action.payload;
  try {
    const { data } = yield call(getTransactionsFromTxid, action.payload);
    data.confirmations = yield call(getConfirmations, data.blockHeight);
    yield put(
      fetchTransactionsDataRequestSuccess({
        txId,
        data,
      })
    );
    yield call(prepareTxnsData, action);
  } catch (err) {
    yield put(
      fetchTransactionsDataRequestFailure({
        txId,
        data: err.message,
      })
    );
  }
}

function* mySaga() {
  yield all([fetchNewTxnData()]);
}

export default mySaga;
