import { call, put, select, takeLatest } from 'redux-saga/effects';
import { BigNumber } from 'bignumber.js';
import {
  fetchTxInfoStartedRequest,
  fetchTxInfoFailureRequest,
  fetchTxInfoSuccessRequest,
} from './reducer';
import { handleGetTxInfo } from './services';

function* getNetwork() {
  const { network } = yield select((state) => state.app);
  return network;
}

function* fetchTxInfoStarted(action) {
  try {
    const network = yield call(getNetwork);
    const query = {
      network,
      txid: action.payload,
    };
    const blocks = yield call(handleGetTxInfo, query);
    const data = blocks;
    yield put(fetchTxInfoSuccessRequest(data));
  } catch (err) {
    yield put(fetchTxInfoFailureRequest(err.message));
  }
}

function* mySaga() {
  yield takeLatest(fetchTxInfoStartedRequest.type, fetchTxInfoStarted);
}

export default mySaga;
