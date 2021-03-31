import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';
import { RouteComponentProps } from 'react-router-dom';
import { Col, Row, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import KeyValueLi from '../../components/KeyValueLi';
import { getTransactionFromTxidRequest } from './reducer';
import { mDFI, TRANSACTION_BASE_PATH } from '../../constants';
import {
  getAmountInSelectedUnit,
  getTime,
  getTimeFromNow,
} from '../../utils/utility';
import TransactionHashRow from '../TransactionHashRow';

interface RouteInfo {
  txId: string;
}

interface TransactionPageProps extends RouteComponentProps<RouteInfo> {
  getTransactionFromTxidRequest: (txId: string) => void;
  isLoading: boolean;
  isError: string;
  data: any;
  unit: string;
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
    unit,
  } = props;

  useEffect(() => {
    getTransactionFromTxidRequest(params.txId);
  }, [params]);

  const loadTransactionPage = () => {
    if (isLoading)
      return <div>{I18n.t('containers.transactionPage.loading')}</div>;
    if (isError) return <div>{isError}</div>;
    if (data && data.transactions) {
      return (
        <>
          <Row>
            <Col xs='12'>
              <h1>{I18n.t('containers.transactionPage.transactionTitle')}</h1>
            </Col>
            <Col xs='12'>
              <Row>
                <Col xs='12'>
                  <Row>
                    <Col xs='12' md='8'>
                      <KeyValueLi
                        label={I18n.t(
                          'containers.transactionPage.transactionHash'
                        )}
                        noEllipsis
                        value={`${data.transactions.txid}`}
                      />
                    </Col>
                    <Col xs='12' md='4'>
                      <KeyValueLi
                        label={I18n.t('containers.transactionPage.age')}
                        value={`${getTimeFromNow(data.transactions.time)}`}
                      />
                    </Col>
                    <Col xs='12' md='4'>
                      <KeyValueLi
                        label={I18n.t('containers.transactionPage.minedTime')}
                        value={`${getTime(data.transactions.blocktime)}`}
                      />
                    </Col>
                    <Col xs='12' md='4'>
                      <KeyValueLi
                        label={I18n.t('containers.transactionPage.blockheight')}
                        value={`${data.transactions.blockheight}`}
                      />
                    </Col>
                    <Col xs='12' md='4'>
                      <KeyValueLi
                        label={I18n.t(
                          'containers.transactionPage.confirmations'
                        )}
                        value={`${data.transactions.confirmations}`}
                      />
                    </Col>
                    <Col xs='12' md='4'>
                      <KeyValueLi
                        label={I18n.t('containers.transactionPage.size')}
                        value={I18n.t('containers.transactionPage.sizeFormat', {
                          size: data.transactions.size,
                        })}
                      />
                    </Col>
                    <Col xs='12' md='4'>
                      <KeyValueLi
                        label={I18n.t('containers.transactionPage.feeRate')}
                        value={I18n.t('containers.transactionPage.feeFormat', {
                          fee: data.transactions.fee || 0,
                        })}
                      />
                    </Col>
                    <Col xs='12' md='4'>
                      <KeyValueLi
                        label={I18n.t('containers.transactionPage.amount')}
                        value={`${getAmountInSelectedUnit(
                          data.transactions.valueOut,
                          unit,
                          mDFI
                        )} ${unit}`}
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col xs='12' className='mt-4'>
              <h1>{I18n.t('containers.transactionPage.details')}</h1>
            </Col>
            <Col xs='12' className='mt-4'>
              <TransactionHashRow id={'detail'} tx={data} />
            </Col>
          </Row>
        </>
      );
    }
    return <div />;
  };
  return (
    <>
      <div className='mt-4'>
        <Breadcrumb tag='nav' listTag='div'>
          <BreadcrumbItem tag='a' href={TRANSACTION_BASE_PATH}>
            {I18n.t('containers.transactionPage.transactionListBreadCrumb')}
          </BreadcrumbItem>
          {` > `}
          <BreadcrumbItem active tag='span'>
            {I18n.t('containers.transactionPage.transactionTxidBreadCrumb', {
              txId: params.txId,
            })}
          </BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div className='mt-4'>{loadTransactionPage()}</div>
    </>
  );
};

const mapStateToProps = (state) => {
  const {
    transactionPage: { isLoading, isError, data },
    app: { unit },
  } = state;

  return {
    isLoading,
    isError,
    data,
    unit,
  };
};

const mapDispatchToProps = {
  getTransactionFromTxidRequest: (txId) =>
    getTransactionFromTxidRequest({ txId }),
};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionPage);
