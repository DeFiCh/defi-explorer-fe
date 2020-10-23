import { combineReducers } from '@reduxjs/toolkit';
import { i18nReducer } from 'react-redux-i18n';
import websocketReducer from '../containers/Websocket/reducer';
import appReducer from '../containers/App/reducer';
import homeReducer from '../containers/Home/reducer';
import blockPageReducer from '../containers/BlockPage/reducer';
import addressPageReducer from '../containers/AddressPage/reducer';
import transactionPageReducer from '../containers/TransactionPage/reducer';
import transactionHashRowReducer from '../containers/TransactionHashRow/reducer';
import blockListPageReducer from '../containers/BlockListPage/reducer';

export default combineReducers({
  app: appReducer,
  i18n: i18nReducer,
  websocket: websocketReducer,
  home: homeReducer,
  blockPage: blockPageReducer,
  addressPage: addressPageReducer,
  transactionHashRow: transactionHashRowReducer,
  transactionPage: transactionPageReducer,
  blockListPage: blockListPageReducer,
});
