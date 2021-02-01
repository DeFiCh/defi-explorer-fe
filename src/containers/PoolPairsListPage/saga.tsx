import { call, put, select, takeLatest } from 'redux-saga/effects';
import { LP_DAILY_DFI_REWARD } from '../../constants';
import { handleGetToken } from '../TokensListPage/services';
import {
  fetchPoolPairsListStartedRequest,
  fetchPoolPairsListFailureRequest,
  fetchPoolPairsListSuccessRequest,
  fetchPoolPairPageStartedRequest,
  fetchPoolPairPageSuccessRequest,
  fetchPoolPairPageFailureRequest,
  updateTotalValueLocked,
  fetchSwapTransactionStartedRequest,
  fetchSwapTransactionFailureRequest,
  fetchSwapTransactionSuccessRequest,
} from './reducer';
import {
  fetchCoinGeckoCoinsList,
  fetchGetGov,
  handleGetPoolPair,
  handlePoolPairList,
  getSwapTransaction,
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
    const query = {
      network,
    };
    const { pools, tvl } = yield call(handlePoolPairList, query);

    const poolData = tokenId
      ? pools.filter((item) => {
          return item.idTokenA === tokenId || item.idTokenB === tokenId;
        })
      : pools;
    const data = poolData.map((item) => {
      const totalVolume = new BigNumber(item.volumeA).plus(item.volumeB);
      const staked = new BigNumber(item.totalStaked);
      const commission = staked.gt(0)
        ? totalVolume
            .multipliedBy(0.2)
            .multipliedBy(365)
            .dividedBy(item.totalStaked)
        : new BigNumber(0);
      const totalApy = commission.plus(item.apy).toNumber();
      return {
        ...item,
        totalApy,
        totalVolume: totalVolume.toNumber(),
        commission: commission.toNumber(),
      };
    });
    yield put(updateTotalValueLocked(tvl));
    yield put(fetchPoolPairsListSuccessRequest(data));
  } catch (err) {
    yield put(updateTotalValueLocked(0));
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
    yield put(fetchPoolPairPageSuccessRequest(updatedData));
  } catch (err) {
    yield put(fetchPoolPairPageFailureRequest(err.message));
  }
}

function* fetchPoolPairData(item) {
  const { totalLiquidity } = item;
  const totalVolume = new BigNumber(item.volumeA).plus(item.volumeB);

  const commission = totalLiquidity
    ? totalVolume.multipliedBy(0.2).multipliedBy(365).dividedBy(totalLiquidity)
    : new BigNumber(0);
  const totalApy = commission.plus(item.apy).toNumber();

  return {
    ...item,
    totalVolume,
    totalApy,
    commission: commission.toNumber(),
    'reserveA/reserveB': new BigNumber(item['reserveA/reserveB']).toNumber(),
    'reserveB/reserveA': new BigNumber(item['reserveB/reserveA']).toNumber(),
    reserveA: new BigNumber(item['reserveA']).toNumber(),
    reserveB: new BigNumber(item['reserveB']).toNumber(),
  };
}

function* fetchSwapTransaction(action) {
  const network = yield call(getNetwork);
  const {
    poolPairId,
    pageNumber = 1,
    pageSize = 10,
    sort = null,
  } = action.payload;
  try {
    const { data } = yield call(getSwapTransaction, {
      id: poolPairId,
      network,
      skip: (pageNumber - 1) * pageSize,
      limit: pageSize,
      sort,
    });
    yield put(fetchSwapTransactionSuccessRequest(data));
  } catch (err) {
    yield put(fetchSwapTransactionFailureRequest(err.message));
  }
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
  yield takeLatest(
    fetchSwapTransactionStartedRequest.type,
    fetchSwapTransaction
  );
}

export default mySaga;
