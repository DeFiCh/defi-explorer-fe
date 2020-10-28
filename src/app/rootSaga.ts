import createSagaMiddleware from 'redux-saga';
import { all, fork } from 'redux-saga/effects';
import websocketSaga from '../containers/Websocket/saga';
import homePageSaga from '../containers/Home/saga';
import blockPageSaga from '../containers/BlockPage/saga';
import addressPageSaga from '../containers/AddressPage/saga';
import transactionPageSaga from '../containers/TransactionPage/saga';
import transactionHashRowSaga from '../containers/TransactionHashRow/saga';
import blockListPageSaga from '../containers/BlockListPage/saga';

function* rootSaga() {
  yield all([
    fork(websocketSaga),
    fork(homePageSaga),
    fork(blockPageSaga),
    fork(transactionHashRowSaga),
    fork(addressPageSaga),
    fork(transactionPageSaga),
    fork(blockListPageSaga),
  ]);
}

const sagaMiddleware = createSagaMiddleware();

export const startSaga = () => {
  sagaMiddleware.run(rootSaga);
};

export default sagaMiddleware;
