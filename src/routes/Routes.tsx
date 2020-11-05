import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import {
  // HOME_PAGE_PATH,
  // TRANSACTION_PAGE_INFO_PATH,
  // TRANSACTION_BASE_PATH,
  // BLOCK_PAGE_INFO_PATH,
  // ADDRESS_PAGE_BASE_PATH,
  // BLOCK_PAGE_BASE_PATH,
  // RICH_LIST_PATH,
  // ANCHOR_PAGE,
  INDEX_PATH,
  TOKEN_BASE_PATH,
  TOKEN_PAGE_PATH,
  POOL_BASE_PATH,
  POOL_PAGE_PATH,
} from '../constants';
// import BlockPage from '../containers/BlockPage';
// import AddressPage from '../containers/AddressPage';
// import TransactionPage from '../containers/TransactionPage';
// import HomePageComponent from '../containers/Home';
// import BlockListPage from '../containers/BlockListPage';
// import TransactionsListPage from '../containers/TransactionsListPage';
// import RichListPage from '../containers/RichListPage';
import TokenPage from '../containers/TokensListPage/components/TokenPage';
import TokensListPage from '../containers/TokensListPage';
import PoolPairPage from '../containers/PoolPairsListPage/components/PoolPairPage';
import PoolPairsListPage from '../containers/PoolPairsListPage';

const routes = (url, path) => {
  return (
    <>
      <Redirect from={`${path}/`} to={`${url}/${POOL_BASE_PATH}`} />
      <Route path={`${path}/${TOKEN_PAGE_PATH}`} component={TokenPage} />
      <Route path={`${path}/${TOKEN_BASE_PATH}`} component={TokensListPage} />
      <Route path={`${path}/${POOL_PAGE_PATH}`} component={PoolPairPage} />
      <Route path={`${path}/${POOL_BASE_PATH}`} component={PoolPairsListPage} />
    </>
  );
};

export default routes;
