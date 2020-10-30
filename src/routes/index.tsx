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
} from '../constants';
import BlockPage from '../containers/BlockPage';
import AddressPage from '../containers/AddressPage';
import TransactionPage from '../containers/TransactionPage';
import HomePageComponent from '../containers/Home';
import BlockListPage from '../containers/BlockListPage';
import TransactionsListPage from '../containers/TransactionsListPage';
import RichListPage from '../containers/RichListPage';
import TokensListPage from '../containers/TokensListPage';

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
    <Route exact path={TOKEN_BASE_PATH} component={TokensListPage} />
  </Switch>
);

export default routes;
