import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';
import { RouteComponentProps } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, Col, Row } from 'reactstrap';
import KeyValueLi from '../../components/KeyValueLi';
import { AppBlock } from '../../utils/interfaces';
import { getBlockFromHash, startPagination } from './reducer';
import {
  BLOCK_PAGE_BASE_PATH,
  BLOCK_PAGE_TRANSACTIONS_LIMIT,
} from '../../constants';
import moment from 'moment';
import TransactionHashRow from '../TransactionHashRow';
import Pagination from '../../components/Pagination';

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
            <TransactionHashRow id={id} tx={item} />
          ))}
        </>
      );
    }
    return <div />;
  };

  const blockPageHtml = () => {
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
          </Col>
          <Col xs='12'>
            <Row>
              <Col xs='12' md='8'>
                <KeyValueLi
                  label={I18n.t('containers.blockPage.Block')}
                  value={`${hash}`}
                  noEllipsis
                />
              </Col>
              <Col xs='12' md='4'>
                <KeyValueLi
                  label={I18n.t('containers.blockPage.numOfTxns')}
                  value={`${txlength}`}
                />
              </Col>
              <Col xs='12' md='4'>
                <KeyValueLi
                  label={I18n.t('containers.blockPage.height')}
                  value={`${height}`}
                />
              </Col>
              <Col xs='12' md='4'>
                <KeyValueLi
                  label={I18n.t('containers.blockPage.block')}
                  value={`${reward}`}
                />
              </Col>
              <Col xs='12' md='4'>
                <KeyValueLi
                  label={I18n.t('containers.blockPage.timestamp')}
                  value={`${moment(time).format('lll')}`}
                />
              </Col>
              <Col xs='12' md='8'>
                <KeyValueLi
                  label={I18n.t('containers.blockPage.merkleRoot')}
                  value={`${merkleroot}`}
                  noEllipsis
                />
              </Col>
              <Col xs='12' md='4'>
                <KeyValueLi
                  label={I18n.t('containers.blockPage.confirmations')}
                  value={`${confirmations}`}
                />
              </Col>
              <Col xs='12' md='4'>
                <KeyValueLi
                  label={I18n.t('containers.blockPage.difficulty')}
                  value={`${difficulty}`}
                />
              </Col>
              <Col xs='12' md='4'>
                <KeyValueLi
                  label={I18n.t('containers.blockPage.bits')}
                  value={`${bits}`}
                />
              </Col>
              <Col xs='12' md='4'>
                <KeyValueLi
                  label={I18n.t('containers.blockPage.size')}
                  value={`${size}`}
                />
              </Col>
              <Col xs='12' md='4'>
                <KeyValueLi
                  label={I18n.t('containers.blockPage.version')}
                  value={`${version}`}
                />
              </Col>
              <Col xs='12' md='4'>
                <KeyValueLi
                  label={I18n.t('containers.blockPage.nextBlock')}
                  value={`${height + 1}`}
                  href={
                    !!nextblockhash &&
                    `${BLOCK_PAGE_BASE_PATH}/${nextblockhash}`
                  }
                />
              </Col>
              <Col xs='12' md='4'>
                <KeyValueLi
                  label={I18n.t('containers.blockPage.previousBlock')}
                  value={`${height - 1}`}
                  href={`${BLOCK_PAGE_BASE_PATH}/${previousblockhash}`}
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
  return (
    <>
      <div className='mt-4'>
        <Breadcrumb tag='nav' listTag='div'>
          <BreadcrumbItem tag='a' href={BLOCK_PAGE_BASE_PATH}>
            {I18n.t('containers.blockPage.blockListBreadCrumb')}
          </BreadcrumbItem>
          {` > `}
          <BreadcrumbItem active tag='span'>
            {I18n.t('containers.blockPage.blockHashBreadCrumb', {
              blockHash: params.blockHash,
            })}
          </BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div className='mt-4'>{blockPageHtml()}</div>
    </>
  );
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
