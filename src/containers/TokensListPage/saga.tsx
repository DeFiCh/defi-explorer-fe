import { call, put, takeLatest } from 'redux-saga/effects';
import { NETWORK } from '../../constants';
import {
  fetchTokensListStartedRequest,
  fetchTokensListFailureRequest,
  fetchTokensListSuccessRequest,
  fetchTokenPageStartedRequest,
  fetchTokenPageSuccessRequest,
  fetchTokenPageFailureRequest,
} from './reducer';
import { handleGetToken, handleTokenList } from './services';

function* fetchTokensListStarted() {
  try {
    let cloneTokenList: any[] = [];
    let start = 0;
    let including_start = true;
    while (true) {
      const queryParams = {
        start,
        limit: 500,
        network: NETWORK,
        including_start,
      };
      const data = yield call(handleTokenList, queryParams);
      cloneTokenList = cloneTokenList.concat(data);
      yield put(fetchTokensListSuccessRequest(cloneTokenList));
      if (data.length === 0) {
        break;
      } else {
        including_start = false;
        start = cloneTokenList[cloneTokenList.length - 1].tokenId;
      }
    }
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
    const data = yield call(handleGetToken, query);

    yield put(fetchTokenPageSuccessRequest(data));
  } catch (err) {
    yield put(fetchTokenPageFailureRequest(err.message));
  }
}

function* mySaga() {
  yield takeLatest(fetchTokensListStartedRequest.type, fetchTokensListStarted);
  yield takeLatest(fetchTokenPageStartedRequest.type, fetchTokenPageStarted);
}

export default mySaga;
