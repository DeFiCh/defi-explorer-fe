import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import reducer from './rootReducer';
import sagaMiddleware, { startSaga } from './rootSaga';
import { setupI18n } from '../translations/i18n';

const middleware = [...getDefaultMiddleware(), sagaMiddleware];

const store = configureStore({
  reducer,
  middleware,
});

startSaga();
setupI18n(store);

export default store;
