import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { NETWORK, LP_DAILY_DFI_REWARD } from '../../constants';
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
  fetchGetGov,
  handleGetPoolPair,
  handlePoolPairList,
} from './services';
import uniqBy from 'lodash/uniqBy';
import { getCoinGeckoIdwithSymbol } from '../../utils/utility';
import { BigNumber } from 'bignumber.js';

function* getNetwork() {
  const { network } = yield select((state) => state.app);
  return network;
}

function* fetchPoolPairsListStarted(action) {
  try {
    const network = yield call(getNetwork);
    const { tokenId } = action.payload;
    let clonePoolPairsList: any[] = [];
    let start = 0;
    let including_start = true;
    while (true) {
      const queryParams = {
        start,
        limit: 500,
        network,
        including_start,
      };
      const data = yield call(handlePoolPairList, queryParams);
      clonePoolPairsList = clonePoolPairsList.concat(data);

      if (data.length === 0) {
        break;
      } else {
        including_start = false;
        start = clonePoolPairsList[clonePoolPairsList.length - 1].poolPairId;
      }
    }
    const updatedData = yield all(
      clonePoolPairsList
        .filter((item) =>
          !tokenId
            ? !tokenId // tokenId not present then filter will get all the values
            : item.idTokenA === tokenId || item.idTokenB === tokenId
        )
        .map((item) => call(fetchPoolPairData, item))
    );

    const updatedClonePoolPairsList = yield call(fetchTokenPrice, updatedData);
    yield put(fetchPoolPairsListSuccessRequest(updatedClonePoolPairsList));
  } catch (err) {
    yield put(fetchPoolPairsListFailureRequest(err.message));
  }
}

function* fetchPoolPairPageStarted(action) {
  const network = yield call(getNetwork);

  const { poolPairId } = action.payload;
  const query = {
    id: poolPairId,
    network,
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
  const network = yield call(getNetwork);

  const queryParamIdTokenA = {
    id: idTokenA,
    network,
  };
  const queryParamIdTokenB = {
    id: idTokenB,
    network,
  };

  const dataIdTokenA = yield call(handleGetToken, queryParamIdTokenA);
  const dataIdTokenB = yield call(handleGetToken, queryParamIdTokenB);
  return {
    ...item,
    'reserveA/reserveB': new BigNumber(item['reserveA/reserveB']).toNumber(),
    'reserveB/reserveA': new BigNumber(item['reserveB/reserveA']).toNumber(),
    tokenInfo: { idTokenA: dataIdTokenA, idTokenB: dataIdTokenB },
  };
}

function* fetchTokenPrice(lpPairList: any[]) {
  const tokenSymbol: any[] = [];
  const network = yield call(getNetwork);

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
  const list: any[] = [{ symbol: 'DFI', tokenId: '0' }];
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
  const lpDailyDfiReward = yield call(fetchGetGov, {
    name: LP_DAILY_DFI_REWARD,
    network,
  });
  const coinPriceObj = {};
  coinPrice.forEach((item) => {
    coinPriceObj[item.label] = item.value;
  });

  return lpPairList.map((item) => {
    const { reserveA, reserveB, idTokenA, idTokenB, rewardPct } = item;

    const yearlyPoolReward = new BigNumber(lpDailyDfiReward)
      .times(rewardPct)
      .times(365)
      .times(coinPriceObj[0]);

    const liquidityReserveidTokenA = new BigNumber(reserveA).times(
      coinPriceObj[idTokenA] || 0
    );

    const liquidityReserveidTokenB = new BigNumber(reserveB).times(
      coinPriceObj[idTokenB] || 0
    );

    const totalLiquidity = liquidityReserveidTokenA.plus(
      liquidityReserveidTokenB
    );

    return {
      ...item,
      totalLiquidity: totalLiquidity.toNumber(),
      yearlyPoolReward: yearlyPoolReward.toNumber(),
      apy: totalLiquidity.gt(0)
        ? yearlyPoolReward.times(100).div(totalLiquidity).toNumber()
        : 0,
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
