import { all, call, put, takeLatest } from 'redux-saga/effects';
import { NETWORK } from '../../constants';
import { handleGetToken } from '../TokensListPage/services';
import {
  fetchPoolPairsListStartedRequest,
  fetchPoolPairsListFailureRequest,
  fetchPoolPairsListSuccessRequest,
  fetchPoolPairPageStartedRequest,
  fetchPoolPairPageSuccessRequest,
  fetchPoolPairPageFailureRequest,
} from './reducer';
import { handleGetPoolPair, handlePoolPairList } from './services';

function* fetchPoolPairsListStarted() {
  try {
    let clonePoolPairsList: any[] = [];
    let start = 0;
    let including_start = true;
    while (true) {
      const queryParams = {
        start,
        limit: 500,
        network: NETWORK,
        including_start,
      };
      const data = yield call(handlePoolPairList, queryParams);
      const updatedData = yield all(
        data.map((item) => call(fetchPoolPairData, item))
      );
      clonePoolPairsList = clonePoolPairsList.concat(updatedData);
      yield put(fetchPoolPairsListSuccessRequest(clonePoolPairsList));
      if (data.length === 0) {
        break;
      } else {
        including_start = false;
        start = clonePoolPairsList[clonePoolPairsList.length - 1].poolPairId;
      }
    }
  } catch (err) {
    yield put(fetchPoolPairsListFailureRequest(err.message));
  }
}

function* fetchPoolPairPageStarted(action) {
  const { poolPairId } = action.payload;
  const query = {
    id: poolPairId,
    network: NETWORK,
  };
  try {
    const data = yield call(handleGetPoolPair, query);
    const updatedData = yield call(fetchPoolPairData, data);
    yield put(fetchPoolPairPageSuccessRequest(updatedData));
  } catch (err) {
    yield put(fetchPoolPairPageFailureRequest(err.message));
  }
}

function* fetchPoolPairData(item) {
  const { idTokenA, idTokenB } = item;
  const queryParamIdTokenA = {
    id: idTokenA,
    network: NETWORK,
  };

  const queryParamIdTokenB = {
    id: idTokenB,
    network: NETWORK,
  };

  const dataIdTokenA = yield call(handleGetToken, queryParamIdTokenA);
  const dataIdTokenB = yield call(handleGetToken, queryParamIdTokenB);
  return {
    ...item,
    tokenInfo: { idTokenA: dataIdTokenA, idTokenB: dataIdTokenB },
  };
}

function* mySaga() {
  yield takeLatest(
    fetchPoolPairsListStartedRequest.type,
    fetchPoolPairsListStarted
  );
  yield takeLatest(
    fetchPoolPairPageStartedRequest.type,
    fetchPoolPairPageStarted
  );
}

export default mySaga;
