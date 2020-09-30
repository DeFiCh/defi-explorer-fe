import { cloneDeep } from "lodash";
import {
  actionChannel,
  all,
  call,
  put,
  select,
  take,
  takeLatest,
} from "redux-saga/effects";
import {
  LATEST_BLOCKS_LIMIT,
  LATEST_TRANSACTIONS_LIMIT,
} from "../../constants";
import {
  newLatestBlock,
  newLatestTransaction,
  newLatestCoin,
  storeLatestBlocks,
  storeLatestTransactions,
  storeLatestCoins,
  fetchLatestBlocks,
  fetchLatestTransactions,
  fetchLatestCoins,
  fetchLatestBlocksSuccess,
  fetchLatestTransactionsSuccess,
  fetchLatestCoinsSuccess,
  fetchLatestBlocksFail,
  fetchLatestTransactionsFail,
  fetchLatestCoinsFail,
} from "./reducer";

const insertLatest = (arr: any[], newData, limit: number) => {
  const cloneArr = cloneDeep(arr);
  if (cloneArr.length >= limit) {
    cloneArr.splice(-1, 1);
  }
  cloneArr.push(newData);
  return cloneArr;
};

function* watchLatestTransaction() {
  const requestChan = yield actionChannel(newLatestTransaction.type);
  while (true) {
    const action = yield take(requestChan);
    yield call(prepareLatestTransactions, action);
  }
}

function* watchLatestBlocks() {
  const requestChan = yield actionChannel(newLatestBlock.type);
  while (true) {
    const action = yield take(requestChan);
    yield call(prepareLatestBlock, action);
  }
}

function* watchLatestCoins() {
  const requestChan = yield actionChannel(newLatestCoin.type);
  while (true) {
    const action = yield take(requestChan);
    yield call(prepareLatestCoins, action);
  }
}

function* prepareLatestBlock(action) {
  const { blocks } = yield select((state) => state.websocket);
  const updatedBlock = insertLatest(
    blocks,
    action.payload,
    LATEST_BLOCKS_LIMIT
  );
  yield put(storeLatestBlocks(updatedBlock));
}

function* prepareLatestTransactions(action) {
  const { transactions } = yield select((state) => state.websocket);
  const updatedTransactions = insertLatest(
    transactions,
    action.payload,
    LATEST_TRANSACTIONS_LIMIT
  );
  yield put(storeLatestTransactions(updatedTransactions));
}

function* prepareLatestCoins(action) {
  const { coins } = yield select((state) => state.websocket);
  const updatedCoins = insertLatest(
    coins,
    action.payload,
    LATEST_TRANSACTIONS_LIMIT
  );
  yield put(storeLatestTransactions(updatedCoins));
}

function* handleFetchLatestBlocks() {}
function* handleFetchLatestTransactions() {}
function* handleFetchLatestCoins() {}

function* mySaga() {
  yield all([
    watchLatestTransaction(),
    watchLatestBlocks(),
    watchLatestCoins(),
    yield takeLatest(fetchLatestBlocks.type, handleFetchLatestBlocks),
    yield takeLatest(
      fetchLatestTransactions.type,
      handleFetchLatestTransactions
    ),
    yield takeLatest(fetchLatestCoins.type, handleFetchLatestCoins),
  ]);
}

export default mySaga;
