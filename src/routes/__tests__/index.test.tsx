import React from 'react';
import { shallow } from 'enzyme';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import route from '../index';
import BlockPage from '../../containers/BlockchainPage/components/BlockPage';
import BlockchainPage from '../../containers/BlockchainPage';
import MinerPage from '../../containers/BlockchainPage/components/MinerPage';
import {
  BLOCKCHAIN_BASE_PATH,
  BLOCKCHAIN_BLOCK_PARAM_PATH,
  BLOCKCHAIN_MINER_PARAM_PATH
} from '../../constants';
let pathMap = {};

describe('Routing', () => {
  beforeAll(() => {
    const component = shallow(
      <Router>
        {route({
          pathname: '/',
          search: '',
          hash: '',
          state: undefined,
        })}
      </Router>
    );
    pathMap = component.find(Route).map((item) => item.props());
  });

  it(`Should check for blockchain on path ${BLOCKCHAIN_BASE_PATH}`, () => {
    if (Array.isArray(pathMap)) {
      const routeData = pathMap.find(
        (item) => item.path === BLOCKCHAIN_BASE_PATH
      );
      expect(routeData.component).toBe(BlockchainPage);
    }
  });

  it(`Should check for blockchain block on path ${BLOCKCHAIN_BLOCK_PARAM_PATH}`, () => {
    if (Array.isArray(pathMap)) {
      const routeData = pathMap.find(
        (item) => item.path === BLOCKCHAIN_BLOCK_PARAM_PATH
      );
      expect(routeData.component).toBe(BlockPage);
    }
  });

  it(`Should check for blockchain miner on path ${BLOCKCHAIN_MINER_PARAM_PATH}`, () => {
    if (Array.isArray(pathMap)) {
      const routeData = pathMap.find(
        (item) => item.path === BLOCKCHAIN_MINER_PARAM_PATH
      );
      expect(routeData.component).toBe(MinerPage);
    }
  });
});
