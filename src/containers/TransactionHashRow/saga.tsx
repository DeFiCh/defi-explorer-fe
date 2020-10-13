import { actionChannel, all, call, put, take } from 'redux-saga/effects';
import {
  fetchNewTxnDataRequest,
  fetchNewTxnDataRequestSuccess,
  fetchNewTxnDataRequestFailure,
} from './reducer';
import { getInsAndOutsFromTxId } from './services';

function* fetchNewTxnData() {
  const requestChan = yield actionChannel(fetchNewTxnDataRequest.type);
  while (true) {
    const action = yield take(requestChan);
    yield call(prepareData, action);
  }
}

function* prepareData(action) {
  const txId = action.payload;
  try {
    const { data } = yield call(getInsAndOutsFromTxId, action.payload);
    yield put(
      fetchNewTxnDataRequestSuccess({
        txId,
        data,
      })
    );
  } catch (err) {
    yield put(
      fetchNewTxnDataRequestFailure({
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
