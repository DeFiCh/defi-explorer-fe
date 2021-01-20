import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';
import moment from 'moment';
import { fetchSwapTransactionStartedRequest } from '../../reducer';
import CustomTable from '../../../../components/CustomTable';
import { numberWithCommas } from '../../../../utils/utility';
import { MAINNET_EXPLORER, TESTNET_EXPLORER } from '../../../../constants';
import { Button } from 'reactstrap';
import { getBlockDetailService } from '../../services';

interface PoolPairPageTable {
  poolPairId: string | number;
  isLoading: boolean;
  data: any;
  total: number;
  isError: string;
  network: string;
  fetchSwapTransactionStartedRequestData: (
    poolPairId: string | number,
    pageNumber: number,
    sortObj?: any
  ) => void;
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

  useEffect(() => {
    fetchSwapTransactionStartedRequestData(poolPairId, currentPage);
  }, []);

  const fetchSwapData = (pageNum, sortObj) => {
    setCurrentPage(pageNum);
    fetchSwapTransactionStartedRequestData(poolPairId, pageNum, sortObj);
  };

  const handlePageClick = (pageNum) => {
    fetchSwapData(pageNum, sort);
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
            <Button
              color='link'
              className='p-0'
              onClick={() => handelBlockClick(obj.blockHeight)}
            >
              {obj.blockHeight}
            </Button>
          );
        },
        sortable: true,
      },
      {
        name: I18n.t('containers.poolPairsSwapListPage.blockTime'),
        field: 'blockTime',
        cell: (obj) => {
          return moment(obj.blockTime).format('lll');
        },
        sortable: true,
      },
      {
        name: I18n.t('containers.poolPairsSwapListPage.txn'),
        field: 'txid',
        cell: (obj) => {
          return (
            <Button
              color='link'
              className='p-0'
              onClick={() => handelTxClick(obj.txid)}
            >
              {obj.txid}
            </Button>
          );
        },
      },
      {
        name: I18n.t('containers.poolPairsSwapListPage.baseToken'),
        field: 'baseTokenAmount',
        cell: (obj) => {
          return (
            <div className='float-right'>
              {numberWithCommas(obj.baseTokenAmount)} {obj.baseTokenSymbol}
            </div>
          );
        },
        sortable: true,
      },
      {
        name: I18n.t('containers.poolPairsSwapListPage.quoteToken'),
        field: 'quoteTokenAmount',
        cell: (obj) => {
          return (
            <div className='float-right'>
              {numberWithCommas(obj.quoteTokenAmount)} {obj.quoteTokenSymbol}
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
  fetchSwapTransactionStartedRequestData: (poolPairId, pageNumber, sort) =>
    fetchSwapTransactionStartedRequest({ poolPairId, pageNumber, sort }),
};

export default connect(mapStateToProps, mapDispatchToProps)(PoolPairPageTable);
