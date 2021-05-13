import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';
import { fetchTxInfoStartedRequest } from './reducer';
import styles from './TxInfoPage.module.scss';

const txInfoPage = (props) => {
  const {
    fetchTxInfoStartedRequest,
    isLoading,
    data,
    isError,
    match: {
      params: { txid },
    },
  } = props;

  useEffect(() => {
    fetchTxInfoStartedRequest(txid);
  }, []);

  return (
    <>
      <h1>{I18n.t('containers.txInfoPage.txInfoPageTitle')}</h1>
      <p className={styles.infoText}>
        {typeof props.data === 'object'
          ? JSON.stringify(props.data, null, 4)
          : `${props.data}`}
      </p>
    </>
  );
};

const mapStateToProps = ({ txInfoPage, app }) => ({
  data: txInfoPage.data,
});

const mapDispatchToProps = {
  fetchTxInfoStartedRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(txInfoPage);
