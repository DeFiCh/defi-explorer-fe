import { actionChannel, all, take } from 'redux-saga/effects';
import {
  newLatestBlocks,
  newLatestTransaction,
  newLatestCoins,
} from './reducer';

function* watchLatestTransaction() {
  const requestChan = yield actionChannel(newLatestTransaction.type);
  while (true) {
    const { payload } = yield take(requestChan);
    console.log(payload);
  }
}

function* watchLatestBlocks() {
  const requestChan = yield actionChannel(newLatestBlocks.type);
  while (true) {
    const { payload } = yield take(requestChan);
    console.log(payload);
  }
}

function* watchLatestCoins() {
  const requestChan = yield actionChannel(newLatestCoins.type);
  while (true) {
    const { payload } = yield take(requestChan);
    console.log(payload);
  }
}

function* mySaga() {
  yield all([
    watchLatestTransaction(),
    watchLatestBlocks(),
    watchLatestCoins(),
  ]);
}

export default mySaga;
