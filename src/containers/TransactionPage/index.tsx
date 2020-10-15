import React, { useEffect, useState } from 'react';
import CopyToClipIcon from '../../components/CopyToClipIcon';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';
import { NavLink, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Collapse, Row } from 'reactstrap';
import KeyValueLi from '../../components/KeyValueLi';
import { getTransactionFromTxidRequest } from './reducer';
import { BLOCK_PAGE_BASE_PATH, TRANSACTION_BASE_PATH } from '../../constants';
import TransactionHashRow from '../TransactionHashRow';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';
import styles from './TransactionPage.module.scss';
import { getTime } from '../../utils/utility';
import { AppTx } from '../../utils/tx';

interface RouteInfo {
  txId: string;
}

interface TransactionPageProps extends RouteComponentProps<RouteInfo> {
  getTransactionFromTxidRequest: (txId: string) => void;
  isLoading: boolean;
  isError: string;
  transaction: AppTx;
}

const TransactionPage: React.FunctionComponent<TransactionPageProps> = (
  props: TransactionPageProps
) => {
  const {
    match: { params },
    getTransactionFromTxidRequest,
    isLoading,
    isError,
    transaction,
  } = props;
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    getTransactionFromTxidRequest(params.txId);
  }, [params]);

  const loadDetailComponent = () => (
    <Row>
      <Col xs='1'>
        <Button
          color='link'
          onClick={() => setIsOpen(!isOpen)}
          className={styles.btnDropdown}
        >
          {isOpen ? <MdArrowDropDown /> : <MdArrowDropUp />}
        </Button>
      </Col>
      <Col xs='11'>
        <Button
          to={`${TRANSACTION_BASE_PATH}/${transaction.txid}`}
          color='link'
          tag={NavLink}
          className={styles.txIdData}
        >
          {transaction.txid}
        </Button>
      </Col>
      <Col xs='12'>
        <Collapse isOpen={isOpen}>
          <TransactionHashRow id={'detail'} tx={transaction} />
        </Collapse>
      </Col>
    </Row>
  );

  const loadTransactionPage = () => {
    if (isLoading)
      return <div>{I18n.t('containers.TransactionPage.loading')}</div>;
    if (isError) return <div>{isError}</div>;
    return (
      <>
        <Row>
          <Col xs='12'>
            <h1>{I18n.t('containers.transactionPage.transactionTitle')}</h1>
            <div className='my-2'>
              <span>{I18n.t('containers.transactionPage.txHash')}: </span>
              <span>{params.txId}</span>
              <span>
                <CopyToClipIcon value={params.txId!} uid={'txIdCopy'} />
              </span>
            </div>
          </Col>
          <Col xs='12'>
            <h1>{I18n.t('containers.transactionPage.summary')}</h1>
            <Row>
              <Col xs='12'>
                <KeyValueLi
                  label={I18n.t('containers.transactionPage.size')}
                  value={I18n.t('containers.transactionPage.sizeFormat', {
                    size: transaction.size,
                  })}
                />
                <KeyValueLi
                  label={I18n.t('containers.transactionPage.feeRate')}
                  value={I18n.t('containers.transactionPage.feeFormat', {
                    fee: transaction.fee || 0,
                  })}
                />
                <KeyValueLi
                  label={I18n.t('containers.transactionPage.receivedTime')}
                  value={`${getTime(transaction.time)}`}
                />
                <KeyValueLi
                  label={I18n.t('containers.transactionPage.minedTime')}
                  value={`${getTime(transaction.blocktime)}`}
                />
                <KeyValueLi
                  label={I18n.t('containers.transactionPage.includedInBlock')}
                  value={`${transaction.blockhash}`}
                  href={`${BLOCK_PAGE_BASE_PATH}/${transaction.blockhash}`}
                />
              </Col>
            </Row>
          </Col>
          <Col xs='12' className='mt-4'>
            <h1>{I18n.t('containers.transactionPage.details')}</h1>
          </Col>
          <Col xs='12' className='mt-4'>
            {loadDetailComponent()}
          </Col>
        </Row>
      </>
    );
  };
  return <div className='mt-4'>{loadTransactionPage()}</div>;
};

const mapStateToProps = (state) => {
  const {
    transactionPage: { isLoading, isError, data },
  } = state;

  return {
    isLoading,
    isError,
    transaction: data,
  };
};

const mapDispatchToProps = {
  getTransactionFromTxidRequest: (txId) =>
    getTransactionFromTxidRequest({ txId }),
};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionPage);
