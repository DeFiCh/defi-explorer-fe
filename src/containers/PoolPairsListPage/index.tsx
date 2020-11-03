import React from 'react';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';
import { fetchPoolPairsListStartedRequest } from './reducer';
import PoolPairsTable from './components/PoolPairsTable';

const poolPairsListPage = () => {
  return (
    <div>
      <h1>{I18n.t('containers.poolPairsListPage.poolPairsListPageTitle')}</h1>
      <PoolPairsTable />
    </div>
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
