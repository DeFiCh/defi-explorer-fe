import BigNumber from 'bignumber.js';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { BURN_ADDRESS, MAINNET } from '../../constants';
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
  fetchTokenRichListStarted,
  fetchTokenRichListSuccess,
  fetchTokenRichListFailure,
} from './reducer';
import {
  fetchBalancesByAddress,
  handleGetToken,
  handleTokenList,
  handleTokenRichList,
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
  const { unit } = yield select((state) => state.app);
  const query = {
    id: tokenId,
    network,
  };
  try {
    const data = yield call(handleGetToken, query);
    const burnedAddressBalance =
      network === MAINNET
        ? yield call(fetchBalancesByAddress, BURN_ADDRESS, unit, network)
        : [];
    const currentTokenBurnedData = burnedAddressBalance.find(
      (d: { id: any }) => d.id === tokenId
    );
    if (currentTokenBurnedData && currentTokenBurnedData.balance) {
      data.burnAddress = BURN_ADDRESS;
      data.burned = currentTokenBurnedData.balance;
      data.netSupply = new BigNumber(data.minted)
        .minus(currentTokenBurnedData.balance)
        .toNumber();
    } else {
      data.netSupply = data.minted;
    }
    yield put(fetchTokenPageSuccessRequest(data));
  } catch (err) {
    yield put(fetchTokenPageFailureRequest(err.message));
  }
}

function* fetchAddressTokensListStarted(action) {
  try {
    const { owner } = action.payload;
    const { unit } = yield select((state) => state.app);
    const network = yield call(getNetwork);
    const data = yield call(fetchBalancesByAddress, owner, unit, network);
    yield put(fetchAddressTokensListSuccessRequest(data));
  } catch (err) {
    yield put(fetchAddressTokensListFailureRequest(err.message));
  }
}

function* fetchTokenRichList(action) {
  const { tokenId } = action.payload;
  const network = yield call(getNetwork);
  const query = {
    id: tokenId,
    network,
  };
  try {
    const data = yield call(handleTokenRichList, query);
    yield put(fetchTokenRichListSuccess(data));
  } catch (err) {
    yield put(fetchTokenRichListFailure(err.message));
  }
}

function* mySaga() {
  yield takeLatest(fetchTokensListStartedRequest.type, fetchTokensListStarted);
  yield takeLatest(fetchTokenPageStartedRequest.type, fetchTokenPageStarted);
  yield takeLatest(
    fetchAddressTokensListStartedRequest.type,
    fetchAddressTokensListStarted
  );
  yield takeLatest(fetchTokenRichListStarted.type, fetchTokenRichList);
}

export default mySaga;
