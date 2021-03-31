import React from 'react';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';
import { fetchPoolPairsListStartedRequest } from './reducer';
import PoolPairsTable from './components/PoolPairsTable';
import TotalValueLocked from './components/TotalValueLocked';
import LiquidityPoolPairsDownload from './components/LiquidityPoolPairsDownload';

const poolPairsListPage = () => {
  return (
    <>
      <h1>{I18n.t('containers.poolPairsListPage.poolPairsListPageTitle')}</h1>
      <TotalValueLocked />
      <LiquidityPoolPairsDownload />
      <PoolPairsTable />
    </>
  );
};

const mapStateToProps = ({ poolPairsListPage, app }) => ({
  isLoading: poolPairsListPage.isLoading,
  data: poolPairsListPage.data,
  isError: poolPairsListPage.isError,
  unit: app.unit,
});

const mapDispatchToProps = {
  fetchPoolPairsListStartedRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(poolPairsListPage);
