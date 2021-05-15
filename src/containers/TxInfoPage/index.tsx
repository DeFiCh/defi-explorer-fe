import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';
import { fetchTxInfoStartedRequest } from './reducer';
import styles from './TxInfoPage.module.scss';
import {
  DEFAULT_DECIMAL_PLACE,
  POOL_LIST_PAGE_URL_NAME,
  TOKENS_LIST_PAGE_LIMIT,
  MAINNET_EXPLORER,
  TESTNET_EXPLORER,
} from '../../constants';

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
  }, [txid]);

  const API_PREFIX =
    props.network === 'mainnet' ? MAINNET_EXPLORER : TESTNET_EXPLORER;

  return (
    <>
      <h1>{I18n.t('containers.txInfoPage.txInfoPageTitle')}</h1>
      <h3>
        Transaction ID:&nbsp;
        <a href={`${API_PREFIX}tx/${txid}`}>{txid}</a>
      </h3>

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
  network: app.network,
});

const mapDispatchToProps = {
  fetchTxInfoStartedRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(txInfoPage);
