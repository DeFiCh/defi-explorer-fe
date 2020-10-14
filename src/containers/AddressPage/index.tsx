import React, { useEffect, useState } from 'react';
import CopyToClipIcon from '../../components/CopyToClipIcon';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';
import { NavLink, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Collapse, Row } from 'reactstrap';
import KeyValueLi from '../../components/KeyValueLi';
import { getAddress } from './reducer';
import {
  BLOCK_PAGE_BASE_PATH,
  mDFI,
  TRANSACTION_BASE_PATH,
} from '../../constants';
import moment from 'moment';
import TransactionHashRow from '../TransactionHashRow';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';
import styles from './AddressPage.module.scss';
import { getAmountInSelectedUnit } from '../../utils/utility';

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
  } = props;
  const [isOpen, setIsOpen] = useState('');

  useEffect(() => {
    getAddress(params.address);
  }, [params]);

  const loadTransatioTable = () => {
    if (transactions.isLoading) return <div>Loading</div>;
    if (transactions.isError) return <div>{transactions.isError}</div>;
    if (Array.isArray(transactions.data)) {
      return (
        <>
          {transactions.data.map((item, id) => (
            <>
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
                    className='text-lowercase'
                  >
                    {item.txid}
                  </Button>
                  <span>
                    <CopyToClipIcon value={item.txid!} uid={`txidCopy_${id}`} />
                  </span>
                </Col>
                <Col xs='12'>
                  <Collapse isOpen={isOpen === id}>
                    <TransactionHashRow id={id} tx={item} {...props} />
                  </Collapse>
                </Col>
              </Row>
            </>
          ))}
        </>
      );
    }
    return <div />;
  };

  const loadHtml = () => {
    if (isLoading) return <div>Loading</div>;
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
              {/* <span>
                <CopyToClipIcon value={params.address!} uid={'blockHashCopy'} />
              </span> */}
            </div>
          </Col>
          <Col xs='12'>
            <h1>{I18n.t('containers.addressPage.summary')}</h1>
            <Row>
              <Col xs='12'>
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
                  value={`${getAmountInSelectedUnit(
                    balance || 0,
                    unit,
                    mDFI
                  )} ${unit}`}
                />
              </Col>
            </Row>
          </Col>
          <Col xs='12' className='mt-4'>
            <h1>Transactions</h1>
          </Col>
          <Col xs='12' className='mt-4'>
            {loadTransatioTable()}
          </Col>
        </Row>
      </>
    );
  };
  return <div className='mt-4'>{loadHtml()}</div>;
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
};

export default connect(mapStateToProps, mapDispatchToProps)(AddressPage);
