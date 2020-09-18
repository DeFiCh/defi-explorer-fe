import { combineReducers } from '@reduxjs/toolkit';
import blockchainReducer from '../containers/BlockchainPage/reducer';
import { i18nReducer } from 'react-redux-i18n';

export default combineReducers({
  blockchain: blockchainReducer,
  i18n: i18nReducer
});
