import { call, put, select, takeLatest } from 'redux-saga/effects';
import {
  fetchTokensListStartedRequest,
  fetchTokensListFailureRequest,
  fetchTokensListSuccessRequest,
  fetchTokenPageStartedRequest,
  fetchTokenPageSuccessRequest,
  fetchTokenPageFailureRequest,
  fetchAddressTokensListStartedRequest,
  fetchAddressTokensListFailureRequest,
  fetchAddressTokensListSuccessRequest,
} from './reducer';
import {
  handleAddressTokenList,
  handleGetToken,
  handleTokenList,
} from './services';

function* getNetwork() {
  const { network } = yield select((state) => state.app);
  return network;
}

function* fetchTokensListStarted() {
  try {
    const network = yield call(getNetwork);
    let cloneTokenList: any[] = [];
    let start = 0;
    let including_start = true;
    while (true) {
      const queryParams = {
        start,
        limit: 500,
        network,
        including_start,
      };
      const data = yield call(handleTokenList, queryParams);
      cloneTokenList = cloneTokenList.concat(data);
      if (data.length === 0) {
        break;
      } else {
        including_start = false;
        start = cloneTokenList[cloneTokenList.length - 1].tokenId;
      }
    }
    yield put(fetchTokensListSuccessRequest(cloneTokenList));
  } catch (err) {
    yield put(fetchTokensListFailureRequest(err.message));
  }
}

function* fetchTokenPageStarted(action) {
  const { tokenId } = action.payload;
  const network = yield call(getNetwork);
  const query = {
    id: tokenId,
    network,
  };
  try {
    const data = yield call(handleGetToken, query);

    yield put(fetchTokenPageSuccessRequest(data));
  } catch (err) {
    yield put(fetchTokenPageFailureRequest(err.message));
  }
}

function* fetchAddressTokensListStarted(action) {
  try {
    const { owner } = action.payload;
    const network = yield call(getNetwork);
    let cloneAddressTokenList: any[] = [];
    let start = 0;
    let including_start = true;
    while (true) {
      const queryParams = {
        start,
        limit: 500,
        network,
        including_start,
        owner,
      };
      const data = yield call(handleAddressTokenList, queryParams);
      cloneAddressTokenList = cloneAddressTokenList.concat(data);
      if (data.length === 0) {
        break;
      } else {
        including_start = false;
        start = cloneAddressTokenList[cloneAddressTokenList.length - 1].id;
      }
    }
    yield put(fetchAddressTokensListSuccessRequest(cloneAddressTokenList));
  } catch (err) {
    console.error(err);
    yield put(fetchAddressTokensListFailureRequest(err.message));
  }
}

function* mySaga() {
  yield takeLatest(fetchTokensListStartedRequest.type, fetchTokensListStarted);
  yield takeLatest(fetchTokenPageStartedRequest.type, fetchTokenPageStarted);
  yield takeLatest(
    fetchAddressTokensListStartedRequest.type,
    fetchAddressTokensListStarted
  );
}

export default mySaga;
