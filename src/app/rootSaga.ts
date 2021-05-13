import createSagaMiddleware from 'redux-saga';
import { all, fork, put } from 'redux-saga/effects';
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
import anchorsListPage from '../containers/AnchorsPage/saga';
import { changeNetwork } from '../containers/App/reducer';

function* appStarting() {
  const NetworkName = window.location.pathname
    .split('/')
    .filter((item) => !!item)[0];
  const networkNameLowercase = NetworkName ? NetworkName.toLowerCase() : '';

  if (
    networkNameLowercase === 'mainnet' ||
    networkNameLowercase === 'testnet'
  ) {
    yield put(changeNetwork(networkNameLowercase));
  }
}

function* rootSaga() {
  yield all([
    appStarting(),
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
    fork(anchorsListPage),
  ]);
}

const sagaMiddleware = createSagaMiddleware();

export const startSaga = () => {
  sagaMiddleware.run(rootSaga);
};

export default sagaMiddleware;
