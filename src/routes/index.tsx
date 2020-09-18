import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import BlockchainPage from '../containers/BlockchainPage';
import BlockPage from '../containers/BlockchainPage/components/BlockPage';
import MinerPage from '../containers/BlockchainPage/components/MinerPage';

import {
  BLOCKCHAIN_BASE_PATH,
  BLOCKCHAIN_BLOCK_PARAM_PATH,
  BLOCKCHAIN_MINER_PARAM_PATH,
} from '../constants';

const routes = (location) => (
  <Switch location={location}>
    {/* <Route exact path={EXCHANGE_PATH} component={ExchangePage} /> */}
    <Route exact path={BLOCKCHAIN_BASE_PATH} component={BlockchainPage} />
    <Route exact path={BLOCKCHAIN_BLOCK_PARAM_PATH} component={BlockPage} />
    <Route exact path={BLOCKCHAIN_MINER_PARAM_PATH} component={MinerPage} />
  </Switch>
);

export default routes;
