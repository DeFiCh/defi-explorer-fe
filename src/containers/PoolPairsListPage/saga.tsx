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
import {
  fetchCoinGeckoCoinsList,
  handleGetPoolPair,
  handlePoolPairList,
} from './services';
import uniqBy from 'lodash/uniqBy';
import { getCoinGeckoIdwithSymbol } from '../../utils/utility';
import { BigNumber } from 'bignumber.js';

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

      if (data.length === 0) {
        break;
      } else {
        including_start = false;
        start = clonePoolPairsList[clonePoolPairsList.length - 1].poolPairId;
      }
    }
    const updatedClonePoolPairsList = yield call(
      fetchTokenPrice,
      clonePoolPairsList
    );
    yield put(fetchPoolPairsListSuccessRequest(updatedClonePoolPairsList));
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
    const lpPairWithTokenPrice = yield call(fetchTokenPrice, [updatedData]);
    yield put(fetchPoolPairPageSuccessRequest(lpPairWithTokenPrice[0]));
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

function* fetchTokenPrice(lpPairList: any[]) {
  const tokenSymbol: any[] = [];

  lpPairList.forEach((item) => {
    const {
      tokenInfo: {
        idTokenA: { symbol: idTokenASymbol },
        idTokenB: { symbol: idTokenBSymbol },
      },
      idTokenA,
      idTokenB,
    } = item;
    tokenSymbol.push({ symbol: idTokenASymbol, tokenId: idTokenA });
    tokenSymbol.push({ symbol: idTokenBSymbol, tokenId: idTokenB });
  });
  const list: any[] = [];
  uniqBy(tokenSymbol, 'symbol').forEach((item) => {
    const value = getCoinGeckoIdwithSymbol(item.symbol);
    if (value) {
      list.push({
        label: item.tokenId,
        value,
      });
    }
  });
  const coinPrice: any[] = yield call(fetchCoinGeckoCoinsList, list);
  const coinPriceObj = {};
  coinPrice.forEach((item) => {
    coinPriceObj[item.label] = item.value;
  });

  return lpPairList.map((item) => {
    const { reserveA, reserveB, idTokenA, idTokenB } = item;
    return {
      ...item,
      liquidityReserveOfTokens: {
        idTokenA: new BigNumber(reserveA)
          .times(coinPriceObj[idTokenA])
          .toNumber(),
        idTokenB: new BigNumber(reserveB)
          .times(coinPriceObj[idTokenB])
          .toNumber(),
      },
      priceOfTokensInUsd: {
        idTokenA: coinPriceObj[idTokenA],
        idTokenB: coinPriceObj[idTokenB],
      },
    };
  });
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
