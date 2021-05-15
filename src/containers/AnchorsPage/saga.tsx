import { call, put, select, takeLatest } from 'redux-saga/effects';
import { BigNumber } from 'bignumber.js';
import {
  fetchAnchorsListStartedRequest,
  fetchAnchorsListFailureRequest,
  fetchAnchorsListSuccessRequest,
  fetchTimestampsStartedRequest,
  fetchTimestampsFailureRequest,
  fetchTimestampsSuccessRequest,
} from './reducer';
import { handleGetAnchorsList, handleGetTimestamp } from './services';

function* getNetwork() {
  const { network } = yield select((state) => state.app);
  return network;
}

function* fetchAnchorsListStarted(action) {
  try {
    const network = yield call(getNetwork);
    const query = {
      network,
    };
    const blocks = yield call(handleGetAnchorsList, query);
    const data = blocks;
    yield put(fetchAnchorsListSuccessRequest(data));
  } catch (err) {
    yield put(fetchAnchorsListFailureRequest(err.message));
  }
}

function* fetchTimestampsStarted(action) {
  const data = {};

  try {
    for (const blockHash of action.payload) {
      const network = yield call(getNetwork);
      const query = {
        network,
        blockHash,
      };
      data[query.blockHash] = (yield call(handleGetTimestamp, query)).time;
    }
  } catch (err) {
    yield put(fetchTimestampsFailureRequest(err.message));
  }

  yield put(fetchTimestampsSuccessRequest(data));
}

function* mySaga() {
  yield takeLatest(
    fetchAnchorsListStartedRequest.type,
    fetchAnchorsListStarted
  );
  yield takeLatest(fetchTimestampsStartedRequest.type, fetchTimestampsStarted);
}

export default mySaga;
