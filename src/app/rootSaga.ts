import createSagaMiddleware from 'redux-saga';
import { all, fork } from 'redux-saga/effects';
import websocketSaga from '../containers/Websocket/saga'
import homePageSaga from '../containers/Home/saga'

function* rootSaga() {
  yield all([
    fork(websocketSaga),
    fork(homePageSaga),
  ]);
}

const sagaMiddleware = createSagaMiddleware();

export const startSaga = () => {
  sagaMiddleware.run(rootSaga);
};

export default sagaMiddleware;
