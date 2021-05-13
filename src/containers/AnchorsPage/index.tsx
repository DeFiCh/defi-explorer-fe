import React from 'react';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';
import { fetchAnchorsListStartedRequest } from './reducer';
import AnchorsTable from './components/AnchorsTable';

const anchorsListPage = () => {
  return (
    <>
      <h1>{I18n.t('containers.anchorsListPage.anchorsListPageTitle')}</h1>
      <AnchorsTable />
    </>
  );
};

const mapStateToProps = ({ anchorsListPage, app }) => ({
  data: anchorsListPage.data,
  unit: app.unit,
});

const mapDispatchToProps = {
  fetchAnchorsListStartedRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(anchorsListPage);
