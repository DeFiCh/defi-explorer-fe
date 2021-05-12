import { combineReducers } from '@reduxjs/toolkit';
import { i18nReducer } from 'react-redux-i18n';
import websocketReducer from '../containers/Websocket/reducer';
import appReducer from '../containers/App/reducer';
import homeReducer from '../containers/Home/reducer';
import blockPageReducer from '../containers/BlockPage/reducer';
import addressPageReducer from '../containers/AddressPage/reducer';
import transactionPageReducer from '../containers/TransactionPage/reducer';
import transactionsListPageReducer from '../containers/TransactionsListPage/reducer';
import blockListPageReducer from '../containers/BlockListPage/reducer';
import richListPageReducer from '../containers/RichListPage/reducer';
import tokensListPageReducer from '../containers/TokensListPage/reducer';
import poolPairsListPageReducer from '../containers/PoolPairsListPage/reducer';
import anchorsListPageReducer from '../containers/AnchorsPage/reducer';

export default combineReducers({
  app: appReducer,
  i18n: i18nReducer,
  websocket: websocketReducer,
  home: homeReducer,
  blockPage: blockPageReducer,
  addressPage: addressPageReducer,
  transactionPage: transactionPageReducer,
  blockListPage: blockListPageReducer,
  transactionsListPage: transactionsListPageReducer,
  richListPage: richListPageReducer,
  tokensListPage: tokensListPageReducer,
  poolPairsListPage: poolPairsListPageReducer,
  anchorsListPage: anchorsListPageReducer,
});
