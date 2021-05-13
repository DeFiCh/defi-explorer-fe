import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import {
  TOKEN_PAGE_PATH,
  TOKEN_BASE_PATH,
  POOL_PAGE_PATH,
  POOL_BASE_PATH,
  ANCHORS_BASE_PATH,
  TESTNET_DEFAULT_PAGE,
  MAINNET_DEFAULT_PAGE,
  DEFAULT_NETWORK_CHAIN,
  TESTNET_BASE_PATH,
  MAINNET_BASE_PATH,
  ADDRESS_TOKEN_LIST_PAGE,
  TX_INFO_PAGE,
} from '../constants';
import PoolPairsListPage from '../containers/PoolPairsListPage';
import PoolPairPage from '../containers/PoolPairsListPage/components/PoolPairPage';
import TokensListPage from '../containers/TokensListPage';
import TokenPage from '../containers/TokensListPage/components/TokenPage';
import AddressTokenListPage from '../containers/TokensListPage/components/AddressTokenListPage';
import { getNetworkNameFromLocation } from '../utils/utility';
import AnchorsPage from '../containers/AnchorsPage';
import TxInfoPage from '../containers/TxInfoPage';

const Routes = (location) => {
  const network = getNetworkNameFromLocation(location.pathname);
  if (!network || (network !== 'mainnet' && network !== 'testnet')) {
    return <Redirect to={DEFAULT_NETWORK_CHAIN} />;
  }

  return (
    <>
      <Switch location={location}>
        <Redirect
          exact
          path={`${MAINNET_BASE_PATH}/`}
          to={MAINNET_DEFAULT_PAGE}
        />
        <Redirect
          exact
          path={`${TESTNET_BASE_PATH}/`}
          to={TESTNET_DEFAULT_PAGE}
        />
        <Route exact path={TOKEN_PAGE_PATH} component={TokenPage} />
        <Route
          exact
          path={ADDRESS_TOKEN_LIST_PAGE}
          component={AddressTokenListPage}
        />
        <Route exact path={TX_INFO_PAGE} component={TxInfoPage} />

        <Route exact path={TOKEN_BASE_PATH} component={TokensListPage} />
        <Route exact path={POOL_PAGE_PATH} component={PoolPairPage} />
        <Route exact path={POOL_BASE_PATH} component={PoolPairsListPage} />
        <Route exact path={ANCHORS_BASE_PATH} component={AnchorsPage} />
      </Switch>
    </>
  );
};

export default Routes;
