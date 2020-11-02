import { call, put, select, takeLatest } from 'redux-saga/effects';
import { NETWORK } from '../../constants';
import {
  fetchTokensListStartedRequest,
  fetchTokensListFailureRequest,
  fetchTokensListSuccessRequest,
  fetchTokenPageStartedRequest,
  fetchTokenPageFailureRequest,
  fetchTokenPageSuccessRequest,
} from './reducer';
import { handleGetToken, handleTokenList } from './services';

function* fetchTokensListStarted(action) {
  const { pageNumber, pageSize } = action.payload;
  try {
    const queryParams = {
      start: (pageNumber - 1) * pageSize,
      limit: pageSize,
      network: NETWORK,
    };
    const data = yield call(handleTokenList, queryParams);
    yield put(fetchTokensListSuccessRequest(data));
  } catch (err) {
    yield put(fetchTokensListFailureRequest(err.message));
  }
}

function* fetchTokenPageStarted(action) {
  const { tokenId } = action.payload;
  const query = {
    id: tokenId,
    network: NETWORK,
  };
  try {
    const { data } = yield call(handleGetToken, query);
    yield put(fetchTokensListSuccessRequest(data));
  } catch (err) {
    yield put(fetchTokensListFailureRequest(err.message));
  }
}

function* mySaga() {
  yield takeLatest(fetchTokensListStartedRequest.type, fetchTokensListStarted);
  yield takeLatest(fetchTokenPageStartedRequest.type, fetchTokenPageStarted);
}

export default mySaga;
