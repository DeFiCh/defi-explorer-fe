import createSagaMiddleware from 'redux-saga';
import { all, fork } from 'redux-saga/effects';
import websocketSaga from '../containers/Websocket/saga';
import homePageSaga from '../containers/Home/saga';
import blockPageSaga from '../containers/BlockPage/saga';
import addressPageSaga from '../containers/AddressPage/saga';
import transactionPageSaga from '../containers/TransactionPage/saga';
import blockListPageSaga from '../containers/BlockListPage/saga';
import transactionsListPageSaga from '../containers/TransactionsListPage/saga';
import richListPageSaga from '../containers/RichListPage/saga';
import tokensListPageSaga from '../containers/TokensListPage/saga';
import poolPairsListPage from '../containers/PoolPairsListPage/saga';

function* rootSaga() {
  yield all([
    fork(websocketSaga),
    fork(homePageSaga),
    fork(blockPageSaga),
    fork(addressPageSaga),
    fork(transactionPageSaga),
    fork(blockListPageSaga),
    fork(transactionsListPageSaga),
    fork(richListPageSaga),
    fork(tokensListPageSaga),
    fork(poolPairsListPage),
  ]);
}

const sagaMiddleware = createSagaMiddleware();

export const startSaga = () => {
  sagaMiddleware.run(rootSaga);
};

export default sagaMiddleware;
