import React, { useEffect, useState } from 'react';
import CopyToClipIcon from '../../components/CopyToClipIcon';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';
import { NavLink, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Collapse, Row } from 'reactstrap';
import KeyValueLi from '../../components/KeyValueLi';
import { AppBlock } from '../../utils/interfaces';
import { getBlockFromHash, startPagination } from './reducer';
import {
  BLOCK_PAGE_BASE_PATH,
  TRANSACTION_BASE_PATH,
  BLOCK_PAGE_TRANSACTIONS_LIMIT,
} from '../../constants';
import moment from 'moment';
import TransactionHashRow from '../TransactionHashRow/TransactionHashRowDupe';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';
import Pagination from '../../components/Pagination';
import styles from './BlockPage.module.scss';

interface RouteInfo {
  blockHash: string;
}

interface BlockPageProps extends RouteComponentProps<RouteInfo> {
  getBlockFromHash: (blockHash: string) => void;
  block: AppBlock;
  isLoading: boolean;
  isError: string;
  transactions: any;
  startPagination: (
    blockHash: string,
    pageSize: number,
    pageNumber: number
  ) => void;
}

const BlockPage: React.FunctionComponent<BlockPageProps> = (
  props: BlockPageProps
) => {
  const {
    match: { params },
    getBlockFromHash,
    block: {
      height,
      merkleroot,
      size,
      confirmations,
      version,
      difficulty,
      bits,
      hash,
      time,
      txlength,
      previousblockhash,
      nextblockhash,
      reward,
      tx,
    },
    isLoading,
    isError,
    transactions,
    startPagination,
  } = props;
  const [isOpen, setIsOpen] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = BLOCK_PAGE_TRANSACTIONS_LIMIT;
  const pagesCount = Math.ceil(txlength / pageSize);
  const to = txlength - (currentPage - 1) * pageSize;
  const from = Math.max(to - pageSize, 0);

  useEffect(() => {
    getBlockFromHash(params.blockHash);
  }, [params]);

  const fetchData = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    setIsOpen('');
    startPagination(params.blockHash, pageSize, pageNumber - 1);
  };

  const loadTransatioTable = () => {
    if (transactions.isLoading)
      return <div>{I18n.t('containers.blockPage.loading')}</div>;
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
                    className={styles.txIdData}
                  >
                    {item.transactions.txid}
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
            </>
          ))}
        </>
      );
    }
    return <div />;
  };

  const loadHtml = () => {
    if (isLoading) return <div>{I18n.t('containers.blockPage.loading')}</div>;
    if (isError) return <div>{isError}</div>;
    return (
      <>
        <Row>
          <Col xs='12'>
            <h1>
              {I18n.t('containers.blockPage.blockTitle', {
                height,
              })}
            </h1>
            <div className='my-2'>
              <span>{I18n.t('containers.blockPage.blockHash')}: </span>
              <span>{hash}</span>
              <span>
                <CopyToClipIcon value={hash!} uid={'blockHashCopy'} />
              </span>
            </div>
          </Col>
          <Col xs='12'>
            <h1>{I18n.t('containers.blockPage.summary')}</h1>
            <Row>
              <Col xs='12' md='6'>
                <KeyValueLi
                  label={I18n.t('containers.blockPage.numOfTxns')}
                  value={`${txlength}`}
                />
                <KeyValueLi
                  label={I18n.t('containers.blockPage.height')}
                  value={`${height}`}
                />
                <KeyValueLi
                  label={I18n.t('containers.blockPage.block')}
                  value={`${reward}`}
                />
                <KeyValueLi
                  label={I18n.t('containers.blockPage.timestamp')}
                  value={`${moment(time).format('lll')}`}
                />
                <KeyValueLi
                  label={I18n.t('containers.blockPage.merkleRoot')}
                  value={`${merkleroot}`}
                />
                <KeyValueLi
                  label={I18n.t('containers.blockPage.previousBlock')}
                  value={`${height - 1}`}
                  href={`${BLOCK_PAGE_BASE_PATH}/${previousblockhash}`}
                />
              </Col>
              <Col xs='12' md='6'>
                <KeyValueLi
                  label={I18n.t('containers.blockPage.difficulty')}
                  value={`${difficulty}`}
                />
                <KeyValueLi
                  label={I18n.t('containers.blockPage.bits')}
                  value={`${bits}`}
                />
                <KeyValueLi
                  label={I18n.t('containers.blockPage.size')}
                  value={`${size}`}
                />
                <KeyValueLi
                  label={I18n.t('containers.blockPage.version')}
                  value={`${version}`}
                />
                <KeyValueLi
                  label={I18n.t('containers.blockPage.nextBlock')}
                  value={`${height + 1}`}
                  href={
                    !!nextblockhash &&
                    `${BLOCK_PAGE_BASE_PATH}/${nextblockhash}`
                  }
                />
                <KeyValueLi
                  label={I18n.t('containers.blockPage.confirmations')}
                  value={`${confirmations}`}
                />
              </Col>
            </Row>
          </Col>
          <Col xs='12' className='mt-4'>
            <h1>{I18n.t('containers.blockPage.transactions')}</h1>
          </Col>
          <Col xs='12' className='mt-4'>
            {loadTransatioTable()}
          </Col>
          <Col xs='12'>
            <Pagination
              label={I18n.t('containers.addressPage.paginationRange', {
                to,
                total: txlength,
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
  return <div className='mt-4'>{loadHtml()}</div>;
};

const mapStateToProps = (state) => {
  const {
    blockPage: {
      block: { isLoading, isError, data },
      transactions,
    },
  } = state;

  return {
    block: data,
    isLoading,
    isError,
    transactions,
  };
};

const mapDispatchToProps = {
  getBlockFromHash: (blockHash) => getBlockFromHash({ blockHash }),
  startPagination: (blockHash, pageSize, pageNumber) =>
    startPagination({
      blockHash,
      pageSize,
      pageNumber,
    }),
};

export default connect(mapStateToProps, mapDispatchToProps)(BlockPage);
