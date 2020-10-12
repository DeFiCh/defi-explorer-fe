import { call, put, takeLatest } from "redux-saga/effects";
import {
  getBlockFromHash,
  getBlockFromHashFailure,
  getBlockFromHashSuccess,
  getTransactionsFromHashSuccess,
  getTransactionsFromHashFailure,
} from "./reducer";
import {
  getBlockFromHashService,
  getTransactionsFromBlockHashService,
} from "./services";

export function* handleGetBlockFromHash(action) {
  const { blockHash } = action.payload;
  try {
    const data = yield call(getBlockFromHashService, blockHash);
    yield put(getBlockFromHashSuccess(data));
    yield call(handleGetTransactionsFromHash, action);
  } catch (err) {
    yield put(getBlockFromHashFailure(err.message));
  }
}

export function* handleGetTransactionsFromHash(action) {
  const { blockHash } = action.payload;
  try {
    const data = yield call(getTransactionsFromBlockHashService, blockHash);
    yield put(getTransactionsFromHashSuccess(data));
  } catch (err) {
    yield put(getTransactionsFromHashFailure(err.message));
  }
}

function* mySaga() {
  yield takeLatest(getBlockFromHash.type, handleGetBlockFromHash);
}

export default mySaga;
