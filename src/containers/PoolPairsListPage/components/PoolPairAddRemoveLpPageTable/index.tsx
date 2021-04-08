import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';
import { fetchPoolPairAddRemoveLiquidityStartedRequest } from '../../reducer';
import CustomTable from '../../../../components/CustomTable';
import {
  camelCaseToNormalCase,
  convertToSentenceCase,
  numberWithCommas,
} from '../../../../utils/utility';
import {
  MAINNET_EXPLORER,
  TESTNET_EXPLORER,
  SWAP_LIST_TABLE_LIMIT,
  DEFAULT_DECIMAL_PLACE,
} from '../../../../constants';
import { getBlockDetailService } from '../../services';
import ValueLi from '../../../../components/ValueLi';
import styles from '../../PoolPairsListPage.module.scss';
import isEmpty from 'lodash/isEmpty';

interface PoolPairAddRemoveLpPageTableProps {
  poolPairId: string | number;
  isLoading: boolean;
  data: any;
  total: number;
  isError: string;
  network: string;
  fetchPoolPairAddRemoveLiquidityStartRequest: (obj: {
    poolPairId: string | number;
    pageNumber: number;
    pageSize?: number;
    sort?: any;
  }) => void;
}

const PoolPairAddRemoveLpPageTable = (
  props: PoolPairAddRemoveLpPageTableProps
) => {
  const {
    poolPairId,
    isError,
    isLoading,
    data,
    total,
    network,
    fetchPoolPairAddRemoveLiquidityStartRequest,
  } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSorting] = useState({});
  const API_PREFIX =
    network === 'mainnet' ? MAINNET_EXPLORER : TESTNET_EXPLORER;
  const pageSize = SWAP_LIST_TABLE_LIMIT;

  useEffect(() => {
    fetchPoolPairAddRemoveLiquidityStartRequest({
      poolPairId,
      pageSize,
      pageNumber: currentPage,
    });
  }, []);

  const fetchAddRemoveLpData = (pageNumber, sort) => {
    setCurrentPage(pageNumber);
    if (isEmpty(sort)) {
      sort = null;
    }
    fetchPoolPairAddRemoveLiquidityStartRequest({
      poolPairId,
      pageSize,
      pageNumber,
      sort,
    });
  };

  const handlePageClick = (pageNumber) => {
    fetchAddRemoveLpData(pageNumber, sort);
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
    fetchAddRemoveLpData(currentPage, sortObj);
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
        name: I18n.t('containers.poolPairsAddRemoveLPListPage.blockHeight'),
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
        name: I18n.t('containers.poolPairsAddRemoveLPListPage.txType'),
        field: 'txType',
        cell: (obj) => {
          return (
            <div title={`${obj.txType}-${obj.blockHeight}`}>
              {convertToSentenceCase(camelCaseToNormalCase(obj?.txType || ''))}
            </div>
          );
        },
        sortable: true,
      },
      {
        name: I18n.t('containers.poolPairsAddRemoveLPListPage.txn'),
        field: 'txid',
        cell: (obj) => {
          return (
            <ValueLi
              copyable
              clickble
              textLimit='60'
              value={obj.txid}
              onclick={() => handelTxClick(obj.txid)}
            />
          );
        },
      },
      {
        name: I18n.t('containers.poolPairsAddRemoveLPListPage.tokenA'),
        field: 'tokenAAmount',
        type: 'number',
        cell: (obj) => {
          return (
            <div
              className={`float-right ${styles.pointer}`}
              title={`${obj.tokenAAmount} ${obj.tokenA}`}
            >
              {numberWithCommas(obj.tokenAAmount, DEFAULT_DECIMAL_PLACE)}{' '}
              {obj.tokenA}
            </div>
          );
        },
        sortable: true,
      },
      {
        name: I18n.t('containers.poolPairsAddRemoveLPListPage.tokenB'),
        field: 'tokenBAmount',
        type: 'number',
        cell: (obj) => {
          return (
            <div
              className={`float-right ${styles.pointer}`}
              title={`${obj.tokenBAmount} ${obj.tokenB}`}
            >
              {numberWithCommas(obj.tokenBAmount, DEFAULT_DECIMAL_PLACE)}{' '}
              {obj.tokenB}
            </div>
          );
        },
        sortable: true,
      },
      {
        name: I18n.t('containers.poolPairsAddRemoveLPListPage.poolPair'),
        field: 'poolpairAmount',
        type: 'number',
        cell: (obj) => {
          return (
            <div
              className={`float-right ${styles.pointer}`}
              title={`${obj.poolpairAmount} ${obj.poolpair}`}
            >
              {numberWithCommas(obj.poolpairAmount, DEFAULT_DECIMAL_PLACE)}{' '}
              {obj.poolpair}
            </div>
          );
        },
        sortable: true,
      },
    ];
  };

  return (
    <div className='mt-5'>
      <h1>{I18n.t('containers.poolPairsAddRemoveLPListPage.title')}</h1>
      <CustomTable
        column={getColumn()}
        data={data ?? []}
        sort={sort}
        pageSize={pageSize}
        total={total ?? 0}
        pagination
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
    poolPairsListPage: {
      poolPairAddRemoveLp: { isLoading, isError, data },
    },
    app: { network },
  } = state;
  return {
    network,
    isLoading,
    data: data?.data,
    total: data?.total,
    isError,
  };
};

const mapDispatchToProps = {
  fetchPoolPairAddRemoveLiquidityStartRequest: (obj) =>
    fetchPoolPairAddRemoveLiquidityStartedRequest(obj),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PoolPairAddRemoveLpPageTable);
