import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import reducer from './rootReducer';
import logger from 'redux-logger';
import sagaMiddleware, { startSaga } from './rootSaga';
import { setupI18n } from '../translations/i18n';

const middleware = [...getDefaultMiddleware(), sagaMiddleware];
const isProduction = process.env.NODE_ENV === 'production';
if (!isProduction) {
  middleware.push(logger)
}

const store = configureStore({
  reducer,
  middleware,
});

startSaga();
setupI18n(store);

export default store;
