import { call, put, select, takeLatest } from 'redux-saga/effects';
import { BigNumber } from 'bignumber.js';
import {
  fetchPoolPairsListStartedRequest,
  fetchPoolPairsListFailureRequest,
  fetchPoolPairsListSuccessRequest,
  fetchPoolPairPageStartedRequest,
  fetchPoolPairPageSuccessRequest,
  fetchPoolPairPageFailureRequest,
  updateTotalValueBlockCountLocked,
  fetchSwapTransactionStartedRequest,
  fetchSwapTransactionFailureRequest,
  fetchSwapTransactionSuccessRequest,
  fetchPoolPairGraphStartedRequest,
  fetchPoolPairGraphFailureRequest,
  fetchPoolPairGraphSuccessRequest,
  fetchPoolPairAddRemoveLPSuccessRequest,
  fetchPoolPairAddRemoveLPErrorRequest,
  fetchPoolPairAddRemoveLiquidityStartedRequest,
  fetchPoolPairVolumeGraphStartedRequest,
  fetchPoolPairVolumeGraphSuccessRequest,
  fetchPoolPairVolumeGraphFailureRequest,
  fetchPoolSwapVolumeSymbols,
} from './reducer';
import {
  handleGetPoolPair,
  handlePoolPairList,
  getSwapTransaction,
  getPoolPairGraph,
  getPoolPairAddRemoveLP,
  getPoolPairVolumeGraph,
  handleBlockCount,
} from './services';

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
      ? pools.filter(
          (item) => item.idTokenA === tokenId || item.idTokenB === tokenId
        )
      : pools;
    const data = poolData.map((item) => {
      const totalVolume = new BigNumber(item.volumeA30)
        .plus(item.volumeB30)
        .toNumber();
      const totalApy = new BigNumber(item.commission).plus(item.apy).toNumber();
      return {
        ...item,
        totalApy,
        totalVolume,
      };
    });
    const tbc = yield call(handleBlockCount, query);
    yield put(updateTotalValueBlockCountLocked({ tvl, tbc }));
    yield put(fetchPoolPairsListSuccessRequest(data));
  } catch (err) {
    yield put(updateTotalValueBlockCountLocked({ tvl: 0, tbc: 0 }));
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

function fetchPoolPairData(item) {
  const { totalLiquidity } = item;
  const totalVolume = new BigNumber(item.volumeA30).plus(item.volumeB30);
  const totalVolume24h = new BigNumber(item.volumeA).plus(item.volumeB);

  const commission = totalLiquidity
    ? totalVolume.multipliedBy(0.2).multipliedBy(365).dividedBy(totalLiquidity)
    : new BigNumber(0);
  const totalApy = commission.plus(item.apy).toNumber();

  return {
    ...item,
    totalVolume: totalVolume.toNumber(),
    totalVolume24h: totalVolume24h.toNumber(),
    totalApy,
    commission: commission.toNumber(),
    'reserveA/reserveB': new BigNumber(item['reserveA/reserveB']).toNumber(),
    'reserveB/reserveA': new BigNumber(item['reserveB/reserveA']).toNumber(),
    reserveA: new BigNumber(item.reserveA).toNumber(),
    reserveB: new BigNumber(item.reserveB).toNumber(),
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

function* fetchPoolPairGraph(action) {
  const network = yield call(getNetwork);
  const { poolPairId, type, start = null, end = null } = action.payload;
  try {
    const {
      data,
    }: {
      data: any[];
    } = yield call(getPoolPairGraph, {
      id: poolPairId,
      network,
      type,
      start,
      end,
    });
    const labels: any[] = [];
    const values: any[] = [];
    if (!data.length) {
      throw new Error('No Records Found');
    }

    data.forEach((item) => {
      const { year, week, day, monthId, hour, minute } = item;
      labels.push({
        year,
        week,
        day,
        monthId,
        hour,
        minute,
      });
      const val = new BigNumber(item.cumTokenAAmount ?? 0)
        .times(item.priceA ?? 1)
        .plus(new BigNumber(item.cumTokenBAmount ?? 0).times(item.priceB ?? 1))
        .toNumber();

      values.push(val);
    });
    yield put(
      fetchPoolPairGraphSuccessRequest({
        labels,
        values,
      })
    );
  } catch (err) {
    yield put(fetchPoolPairGraphFailureRequest(err.message));
  }
}

function* fetchPoolPairVolumeGraph(action) {
  const network = yield call(getNetwork);
  const { poolPairId, type, start = null, end = null } = action.payload;
  try {
    const {
      data,
    }: {
      data: any[];
    } = yield call(getPoolPairVolumeGraph, {
      id: poolPairId,
      network,
      type,
      start,
      end,
    });
    const labels: any[] = [];
    const values: any[] = [];
    const values2: any[] = [];
    const totalVolumes: any[] = [];
    const isValid = data.reduce(
      (acc, curr) => acc && !!curr.baseTokenAmount && !!curr.quoteTokenAmount,
      true
    );

    if (!isValid || !data.length) {
      throw new Error('No Records Found');
    }

    const { baseTokenSymbol: sym1, quoteTokenSymbol: sym2 } = data[0];
    data.forEach((item) => {
      const { year, week, day, monthId, hour, minute } = item;
      labels.push({
        year,
        week,
        day,
        monthId,
        hour,
        minute,
      });
      if (sym1 === item.baseTokenSymbol) {
        values.push(new BigNumber(item.baseTokenAmount).toNumber());
        values2.push(new BigNumber(item.quoteTokenAmount).toNumber());
      }

      if (sym2 === item.baseTokenSymbol) {
        values2.push(new BigNumber(item.baseTokenAmount).toNumber());
        values.push(new BigNumber(item.quoteTokenAmount).toNumber());
      }
      totalVolumes.push(item.totalVolume);
    });
    yield put(
      fetchPoolPairVolumeGraphSuccessRequest({
        labels,
        values2,
        values,
        totalVolumes,
      })
    );
    yield put(fetchPoolSwapVolumeSymbols({ sym1, sym2 }));
  } catch (err) {
    yield put(fetchPoolPairVolumeGraphFailureRequest(err.message));
  }
}

function* fetchPoolPairAddRemoveLiquidity(action) {
  try {
    const network = yield call(getNetwork);
    const {
      payload: { poolPairId, pageSize, pageNumber, sort },
    } = action;
    const {
      data,
    }: {
      data: any[];
    } = yield call(getPoolPairAddRemoveLP, {
      id: poolPairId,
      skip: (pageNumber - 1) * pageSize,
      limit: pageSize,
      network,
      sort,
    });
    yield put(fetchPoolPairAddRemoveLPSuccessRequest(data));
  } catch (err) {
    yield put(fetchPoolPairAddRemoveLPErrorRequest(err));
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
  yield takeLatest(fetchPoolPairGraphStartedRequest.type, fetchPoolPairGraph);
  yield takeLatest(
    fetchPoolPairVolumeGraphStartedRequest.type,
    fetchPoolPairVolumeGraph
  );
  yield takeLatest(
    fetchPoolPairAddRemoveLiquidityStartedRequest.type,
    fetchPoolPairAddRemoveLiquidity
  );
}

export default mySaga;
