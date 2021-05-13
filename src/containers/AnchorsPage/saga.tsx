import { call, put, select, takeLatest } from 'redux-saga/effects';
import { BigNumber } from 'bignumber.js';
import {
  fetchAnchorsListStartedRequest,
  fetchAnchorsListFailureRequest,
  fetchAnchorsListSuccessRequest,
} from './reducer';
import { handleGetAnchorsList } from './services';

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

function* mySaga() {
  yield takeLatest(
    fetchAnchorsListStartedRequest.type,
    fetchAnchorsListStarted
  );
}

export default mySaga;
