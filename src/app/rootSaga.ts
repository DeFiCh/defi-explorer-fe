import createSagaMiddleware from 'redux-saga';
import { all, fork } from 'redux-saga/effects';
import websocketSaga from '../containers/Websocket/saga'
function* rootSaga() {
  yield all([
    fork(websocketSaga)
  ]);
}

const sagaMiddleware = createSagaMiddleware();

export const startSaga = () => {
  sagaMiddleware.run(rootSaga);
};

export default sagaMiddleware;
