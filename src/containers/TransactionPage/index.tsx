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

interface RouteInfo {
  txId: string;
}

interface TransactionPageProps extends RouteComponentProps<RouteInfo> {
  getTransactionFromTxidRequest: (txId: string) => void;
  isLoading: boolean;
  isError: string;
  data: any;
}

const TransactionPage: React.FunctionComponent<TransactionPageProps> = (
  props: TransactionPageProps
) => {
  const {
    match: { params },
    getTransactionFromTxidRequest,
    isLoading,
    isError,
    data,
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
          to={`${TRANSACTION_BASE_PATH}/${data.transactions.txid}`}
          color='link'
          tag={NavLink}
          className={styles.txIdData}
        >
          {data.transactions.txid}
        </Button>
      </Col>
      <Col xs='12'>
        <Collapse isOpen={isOpen}>
          {isOpen && <TransactionHashRow id={'detail'} tx={data} />}
        </Collapse>
      </Col>
    </Row>
  );

  const loadTransactionPage = () => {
    if (isLoading)
      return <div>{I18n.t('containers.TransactionPage.loading')}</div>;
    if (isError) return <div>{isError}</div>;
    if (data && data.transactions) {
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
                      size: data.transactions.size,
                    })}
                  />
                  <KeyValueLi
                    label={I18n.t('containers.transactionPage.feeRate')}
                    value={I18n.t('containers.transactionPage.feeFormat', {
                      fee: data.transactions.fee || 0,
                    })}
                  />
                  <KeyValueLi
                    label={I18n.t('containers.transactionPage.receivedTime')}
                    value={`${getTime(data.transactions.time)}`}
                  />
                  <KeyValueLi
                    label={I18n.t('containers.transactionPage.minedTime')}
                    value={`${getTime(data.transactions.blocktime)}`}
                  />
                  <KeyValueLi
                    label={I18n.t('containers.transactionPage.includedInBlock')}
                    value={`${data.transactions.blockhash}`}
                    href={`${BLOCK_PAGE_BASE_PATH}/${data.transactions.blockhash}`}
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
    }
    return <div />;
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
    data,
  };
};

const mapDispatchToProps = {
  getTransactionFromTxidRequest: (txId) =>
    getTransactionFromTxidRequest({ txId }),
};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionPage);
