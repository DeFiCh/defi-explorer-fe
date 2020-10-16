import React, { useEffect, useState } from 'react';
import CopyToClipIcon from '../../components/CopyToClipIcon';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';
import { NavLink, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Collapse, Row } from 'reactstrap';
import KeyValueLi from '../../components/KeyValueLi';
import { getAddress, startPaginateTransactionsFromAddress } from './reducer';
import { mDFI, TRANSACTION_BASE_PATH } from '../../constants';
import TransactionHashRow from '../TransactionHashRow';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';
import styles from './AddressPage.module.scss';
import { getAmountInSelectedUnit } from '../../utils/utility';
import Pagination from '../../components/Pagination';
import QRCode from 'qrcode.react';

interface RouteInfo {
  address: string;
}

interface AddressPageProps extends RouteComponentProps<RouteInfo> {
  getAddress: (address: string) => void;
  isLoading: boolean;
  isError: string;
  transactions: any;
  address: any;
  unit: string;
  startPaginateTransactionsFromAddress: (address, pageSize, pageNumber) => void;
}

const AddressPage: React.FunctionComponent<AddressPageProps> = (
  props: AddressPageProps
) => {
  const {
    match: { params },
    getAddress,
    isLoading,
    isError,
    address: { balance, confirmed, unconfirmed },
    transactions,
    unit,
    startPaginateTransactionsFromAddress,
  } = props;
  const [isOpen, setIsOpen] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const pagesCount = Math.ceil(transactions.total / pageSize);
  const to = transactions.total - (currentPage - 1) * pageSize;
  const from = Math.max(to - pageSize, 0);

  const fetchData = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    setIsOpen('');
    startPaginateTransactionsFromAddress(params.address, pageSize, pageNumber);
  };

  useEffect(() => {
    getAddress(params.address);
  }, [params]);

  const loadTransatioTable = () => {
    if (transactions.isLoading)
      return <div>{I18n.t('containers.addressPage.loading')}</div>;
    if (transactions.isError) return <div>{transactions.isError}</div>;
    if (Array.isArray(transactions.data)) {
      return (
        <>
          {transactions.data.map((item, id) => (
            <div>
              <Row>
                <Col xs='1'>
                  <Button
                    color='link'
                    className={styles.btnDropdown}
                    onClick={() => {
                      if (isOpen === id) {
                        setIsOpen('');
                      } else {
                        setIsOpen(id);
                      }
                    }}
                  >
                    {isOpen === id ? <MdArrowDropDown /> : <MdArrowDropUp />}
                  </Button>
                </Col>
                <Col xs='9'>
                  <Button
                    to={`${TRANSACTION_BASE_PATH}/${item.txid}`}
                    color='link'
                    tag={NavLink}
                    className={styles.txIdData}
                  >
                    {item.txid}
                  </Button>
                </Col>
                <Col xs='12'>
                  <Collapse isOpen={isOpen === id}>
                    {isOpen === id && (
                      <TransactionHashRow id={id} tx={item} {...props} />
                    )}
                  </Collapse>
                </Col>
              </Row>
            </div>
          ))}
        </>
      );
    }
    return <div />;
  };

  const loadAddressPage = () => {
    if (isLoading) return <div>{I18n.t('containers.addressPage.loading')}</div>;
    if (isError) return <div>{isError}</div>;
    return (
      <>
        <Row>
          <Col xs='12'>
            <h1>
              {I18n.t('containers.addressPage.addressTitle')}{' '}
              <span>
                {balance} {unit}
              </span>
            </h1>
            <div className='my-2'>
              <span>{params.address}</span>
              <span>
                <CopyToClipIcon value={params.address!} uid={'addressCopy'} />
              </span>
            </div>
          </Col>
          <Col xs='12'>
            <h1>{I18n.t('containers.addressPage.summary')}</h1>
            <Row>
              <Col xs='12' md='8'>
                <div className='mb-4'>
                  <KeyValueLi
                    label={I18n.t('containers.addressPage.confirmedBalance')}
                    value={`${getAmountInSelectedUnit(
                      balance || 0,
                      unit,
                      mDFI
                    )} ${unit}`}
                  />
                  <KeyValueLi
                    label={I18n.t('containers.addressPage.nroTransactions')}
                    value={`${transactions.total}`}
                  />
                </div>
              </Col>
              <Col xs='12' md='4'>
                <div className='text-center'>
                  <QRCode value={params.address!} size={240} />
                </div>
              </Col>
            </Row>
          </Col>
          <Col xs='12' className='mt-4'>
            <h1>{I18n.t('containers.addressPage.transactions')}</h1>
          </Col>
          <Col xs='12' className='mt-4'>
            {loadTransatioTable()}
          </Col>
          <Col xs='12'>
            <Pagination
              label={I18n.t('containers.addressPage.paginationRange', {
                to,
                total: transactions.total,
                from: from + 1,
              })}
              currentPage={currentPage}
              pagesCount={pagesCount}
              handlePageClick={fetchData}
            />
          </Col>
        </Row>
      </>
    );
  };
  return <div className='mt-4'>{loadAddressPage()}</div>;
};

const mapStateToProps = (state) => {
  const {
    addressPage: {
      address: { isLoading, isError, data },
      transactions,
    },
    app: { unit },
  } = state;

  return {
    address: data,
    isLoading,
    isError,
    transactions,
    unit,
  };
};

const mapDispatchToProps = {
  getAddress: (address) => getAddress({ address }),
  startPaginateTransactionsFromAddress: (address, pageSize, pageNumber) =>
    startPaginateTransactionsFromAddress({
      address,
      pageSize,
      pageNumber,
    }),
};

export default connect(mapStateToProps, mapDispatchToProps)(AddressPage);
