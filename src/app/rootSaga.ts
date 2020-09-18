import createSagaMiddleware from 'redux-saga';
import { all, fork } from 'redux-saga/effects';
import blockchainSaga from '../containers/BlockchainPage/saga';

function* rootSaga() {
  yield all([
    fork(blockchainSaga)
  ]);
}

const sagaMiddleware = createSagaMiddleware();

export const startSaga = () => {
  sagaMiddleware.run(rootSaga);
};

export default sagaMiddleware;
