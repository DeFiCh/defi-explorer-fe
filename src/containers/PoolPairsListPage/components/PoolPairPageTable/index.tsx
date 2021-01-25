import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';
import { fetchSwapTransactionStartedRequest } from '../../reducer';
import CustomTable from '../../../../components/CustomTable';
import { numberWithCommas } from '../../../../utils/utility';
import {
  MAINNET_EXPLORER,
  TESTNET_EXPLORER,
  SWAP_LIST_TABLE_LIMIT,
  DEFAULT_DECIMAL_PLACE,
} from '../../../../constants';
import { getBlockDetailService } from '../../services';
import ValueLi from '../../../../components/ValueLi';
import styles from '../../PoolPairsListPage.module.scss';

interface PoolPairPageTable {
  poolPairId: string | number;
  isLoading: boolean;
  data: any;
  total: number;
  isError: string;
  network: string;
  fetchSwapTransactionStartedRequestData: (obj: {
    poolPairId: string | number;
    pageNumber: number;
    pageSize?: number;
    sort?: any;
  }) => void;
}

const PoolPairPageTable = (props: PoolPairPageTable) => {
  const {
    poolPairId,
    isError,
    isLoading,
    data,
    total,
    network,
    fetchSwapTransactionStartedRequestData,
  } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSorting] = useState({});
  const API_PREFIX =
    network === 'mainnet' ? MAINNET_EXPLORER : TESTNET_EXPLORER;
  const pageSize = SWAP_LIST_TABLE_LIMIT;

  useEffect(() => {
    fetchSwapTransactionStartedRequestData({
      poolPairId,
      pageSize,
      pageNumber: currentPage,
    });
  }, []);

  const fetchSwapData = (pageNumber, sort) => {
    setCurrentPage(pageNumber);
    fetchSwapTransactionStartedRequestData({
      poolPairId,
      pageSize,
      pageNumber,
      sort,
    });
  };

  const handlePageClick = (pageNumber) => {
    fetchSwapData(pageNumber, sort);
  };

  const handleSorting = (filed) => {
    const sortObj = {};
    if (sort[filed]) {
      if (sort[filed] === -1) {
        sortObj[filed] = sort[filed] * -1;
      }
    } else {
      sortObj[filed] = -1;
    }
    setSorting(sortObj);
    fetchSwapData(currentPage, sortObj);
  };

  const handelBlockClick = async (blockHeight) => {
    const data = await getBlockDetailService(blockHeight);
    if (data && data.hash) {
      window.open(`${API_PREFIX}block/${data.hash}`, '_blank');
    }
  };

  const handelTxClick = async (txId) => {
    if (txId) {
      window.open(`${API_PREFIX}tx/${txId}`, '_blank');
    }
  };

  const getColumn = () => {
    return [
      {
        name: I18n.t('containers.poolPairsSwapListPage.blockHeight'),
        field: 'blockHeight',
        cell: (obj) => {
          return (
            <ValueLi
              clickble
              value={`${obj.blockHeight}`}
              onclick={() => handelBlockClick(obj.blockHeight)}
            />
          );
        },
        sortable: true,
      },
      {
        name: I18n.t('containers.poolPairsSwapListPage.txn'),
        field: 'txid',
        cell: (obj) => {
          return (
            <ValueLi
              copyable
              clickble
              textLimit='40'
              value={obj.txid}
              onclick={() => handelTxClick(obj.txid)}
            />
          );
        },
      },
      {
        name: I18n.t('containers.poolPairsSwapListPage.baseToken'),
        field: 'baseTokenAmount',
        type: 'number',
        cell: (obj) => {
          return (
            <div
              className={`float-right ${styles.pointer}`}
              title={`${obj.baseTokenAmount} ${obj.baseTokenSymbol}`}
            >
              {numberWithCommas(obj.baseTokenAmount, DEFAULT_DECIMAL_PLACE)}{' '}
              {obj.baseTokenSymbol}
            </div>
          );
        },
        sortable: true,
      },
      {
        name: I18n.t('containers.poolPairsSwapListPage.quoteToken'),
        field: 'quoteTokenAmount',
        type: 'number',
        cell: (obj) => {
          return (
            <div
              className={`float-right ${styles.pointer}`}
              title={`${obj.quoteTokenAmount} ${obj.quoteTokenSymbol}`}
            >
              {numberWithCommas(obj.quoteTokenAmount, DEFAULT_DECIMAL_PLACE)}{' '}
              {obj.quoteTokenSymbol}
            </div>
          );
        },
        sortable: true,
      },
    ];
  };

  return (
    <div className='mt-5'>
      <h1>{I18n.t('containers.poolPairsSwapListPage.title')}</h1>
      <CustomTable
        column={getColumn()}
        data={data || []}
        sort={sort}
        pageSize={pageSize}
        total={total || 0}
        pagination={true}
        handlePageClick={handlePageClick}
        handleSorting={handleSorting}
        currentPage={currentPage}
        isError={isError}
        isLoading={isLoading}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  const {
    poolPairsListPage: { swapTransaction },
    app: { network },
  } = state;
  return {
    network,
    isLoading: swapTransaction.isLoading,
    data: swapTransaction.data,
    total: swapTransaction.total,
    isError: swapTransaction.isError,
  };
};

const mapDispatchToProps = {
  fetchSwapTransactionStartedRequestData: (obj) =>
    fetchSwapTransactionStartedRequest(obj),
};

export default connect(mapStateToProps, mapDispatchToProps)(PoolPairPageTable);
