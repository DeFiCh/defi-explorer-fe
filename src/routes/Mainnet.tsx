import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import { changeNetwork, changeChain } from '../containers/App/reducer';
import routes from './Routes';

interface RouteParams {
  chain: string;
  network: string;
}

interface RouteDetector extends RouteComponentProps<RouteParams> {
  changeNetwork: (network: string) => void;
  changeChain: (chain: string) => void;
}

const MainnetRoutes = (props: RouteDetector) => {
  const {
    match: {
      path,
      params: { chain, network },
      url,
    },
    changeNetwork,
    changeChain,
  } = props;

  useEffect(() => {
    changeNetwork(network);
    changeChain(chain);
  }, []);
  return <>{routes(url, path)}</>;
};

const mapStateToProps = (state) => ({});
const mapDispatchToProps = {
  changeNetwork: (network: string) => changeNetwork(network),
  changeChain: (chain: string) => changeChain(chain),
};

export default connect(mapStateToProps, mapDispatchToProps)(MainnetRoutes);
