import { call, put, takeLatest } from "redux-saga/effects";
import {
  quickStatusSuccess,
  startQuickStatus,
  setQuickStatusError,
} from "./reducer";
import { handleQuickStatus } from "./services";

function* fetchQuickStatus() {
  try {
    const response = yield call(handleQuickStatus);
    yield put(quickStatusSuccess(response));
  } catch (err) {
    yield put(setQuickStatusError(err.message));
  }
}

function* mySaga() {
  yield takeLatest(startQuickStatus.type, fetchQuickStatus);
}

export default mySaga;
