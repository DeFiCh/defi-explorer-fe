import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import {
  HOME_PAGE_PATH,
  INDEX_PATH,
  TRANSACTION_PAGE_INFO_PATH,
  TRANSACTION_BASE_PATH,
  BLOCK_PAGE_INFO_PATH,
  ADDRESS_PAGE_BASE_PATH,
  TOKEN_BASE_PATH,
  BLOCK_PAGE_BASE_PATH,
  RICH_LIST_PATH,
  ANCHOR_PAGE,
  TOKEN_PAGE_PATH,
  POOL_BASE_PATH,
  PAIR_PAGE_PATH,
} from '../constants';
import BlockPage from '../containers/BlockPage';
import AddressPage from '../containers/AddressPage';
import TransactionPage from '../containers/TransactionPage';
import HomePageComponent from '../containers/Home';
import BlockListPage from '../containers/BlockListPage';
import TransactionsListPage from '../containers/TransactionsListPage';
import RichListPage from '../containers/RichListPage';
import TokenPage from '../containers/TokensListPage/components/TokenPage';
import TokensListPage from '../containers/TokensListPage';
import PoolPairPage from '../containers/PoolPairsListPage/components/PoolPairPage';
import PoolPairsListPage from '../containers/PoolPairsListPage';

const routes = (location) => (
  <Switch location={location}>
    <Redirect from={INDEX_PATH} to={HOME_PAGE_PATH} />
    <Route exact path={HOME_PAGE_PATH} component={HomePageComponent} />
    <Route
      exact
      path={TRANSACTION_PAGE_INFO_PATH}
      component={TransactionPage}
    />
    <Route exact path={BLOCK_PAGE_BASE_PATH} component={BlockListPage} />
    <Route
      exact
      path={ANCHOR_PAGE}
      component={(props) => <BlockListPage {...props} anchorsOnly />}
    />
    <Route exact path={BLOCK_PAGE_INFO_PATH} component={BlockPage} />
    <Route exact path={ADDRESS_PAGE_BASE_PATH} component={AddressPage} />
    <Route
      exact
      path={TRANSACTION_BASE_PATH}
      component={TransactionsListPage}
    />
    <Route exact path={RICH_LIST_PATH} component={RichListPage} />
    <Route exact path={TOKEN_PAGE_PATH} component={TokenPage} />
    <Route exact path={TOKEN_BASE_PATH} component={TokensListPage} />
    <Route exact path={PAIR_PAGE_PATH} component={PoolPairPage} />
    <Route exact path={POOL_BASE_PATH} component={PoolPairsListPage} />
  </Switch>
);

export default routes;
