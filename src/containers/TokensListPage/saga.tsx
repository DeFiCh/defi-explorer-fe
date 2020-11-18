import BigNumber from 'bignumber.js';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { mDFI } from '../../constants';
import { getAmountInSelectedUnit } from '../../utils/utility';
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
  handleUtxoBalance,
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
    const { unit } = yield select((state) => state.app);
    const network = yield call(getNetwork);
    const defaultDfi = {
      balance: '0',
      id: 'DFI',
      key: '0@DFI',
      name: 'DFI',
    };
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
        const query = {
          id: cloneAddressTokenList[cloneAddressTokenList.length - 1].id,
          network,
        };
        const { tokenId } = yield call(handleGetToken, query);
        if (typeof tokenId === 'undefined' || tokenId === null) {
          break;
        }
        start = tokenId;
      }
    }
    const findDfi = cloneAddressTokenList.find(
      (item) => item.id === defaultDfi.id || item.name === defaultDfi.name
    );

    if (!findDfi) {
      cloneAddressTokenList.push(defaultDfi);
    }

    const updatedAddressTokenList: any[] = [];
    for (const item of cloneAddressTokenList) {
      const query = {
        id: item.id || item.name,
        network,
      };

      if (item.id === 'DFI' || item.name === 'DFI') {
        const utxoBalance = yield call(handleUtxoBalance, owner);
        const unitConversion = getAmountInSelectedUnit(utxoBalance, unit, mDFI);
        item.balance = new BigNumber(unitConversion)
          .plus(item.balance)
          .toNumber();
      }

      const tokenInfo = yield call(handleGetToken, query);
      updatedAddressTokenList.push({
        tokenInfo,
        ...item,
      });
    }
    yield put(fetchAddressTokensListSuccessRequest(updatedAddressTokenList));
  } catch (err) {
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
