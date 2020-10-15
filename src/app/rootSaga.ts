import createSagaMiddleware from 'redux-saga';
import { all, fork } from 'redux-saga/effects';
import websocketSaga from '../containers/Websocket/saga';
import homePageSaga from '../containers/Home/saga';
import blockPageSaga from '../containers/BlockPage/saga';
import addressPageSaga from '../containers/AddressPage/saga';
import transactionHashRowSaga from '../containers/TransactionHashRow/saga';

function* rootSaga() {
  yield all([
    fork(websocketSaga),
    fork(homePageSaga),
    fork(blockPageSaga),
    fork(transactionHashRowSaga),
    fork(addressPageSaga),
  ]);
}

const sagaMiddleware = createSagaMiddleware();

export const startSaga = () => {
  sagaMiddleware.run(rootSaga);
};

export default sagaMiddleware;
