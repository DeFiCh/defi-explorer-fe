import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';
import { Link } from 'react-router-dom';
import {
  Row,
  Col,
  Card,
  Table,
  Button,
  UncontrolledTooltip,
  PopoverBody,
} from 'reactstrap';
import {
  DEFAULT_DECIMAL_PLACE,
  POOL_LIST_PAGE_URL_NAME,
  TOKENS_LIST_PAGE_LIMIT,
} from '../../../../constants';
import { fetchPoolPairsListStartedRequest } from '../../reducer';
import Pagination from '../../../../components/Pagination';
import styles from '../../PoolPairsListPage.module.scss';
import {
  numberWithCommas,
  setRoute,
  tableSorter,
} from '../../../../utils/utility';
import { cloneDeep } from 'lodash';
import BigNumber from 'bignumber.js';
import { RiAddLine } from 'react-icons/ri';
import { PoolPairIcon } from '../PoolPairIcon';
import { MdArrowDownward, MdArrowUpward } from 'react-icons/md';

interface PoolPairsTable {
  fetchPoolPairsListStartedRequest: (tokenId?: string | number) => void;
  isLoading: boolean;
  data: any[];
  isError: string;
  unit: string;
  tokenId?: string | number;
}

const PoolPairsTable = (props: PoolPairsTable) => {
  const {
    fetchPoolPairsListStartedRequest,
    isLoading,
    data,
    isError,
    tokenId,
  } = props;

  const [currentPage, setCurrentPage] = useState(1);
  const [tableRows, setTableRows] = useState<any[]>([]);
  const [sortedField, setSortedField] = useState<any>({
    field: '',
    mode: 0,
  });
  const [tableData, setTableData] = useState<any[]>([]);

  const pageSize = TOKENS_LIST_PAGE_LIMIT;
  const totalCount = tableData.length;

  const pagesCount = Math.ceil(totalCount / pageSize);
  const to = (currentPage - 1) * pageSize + 1;
  const from = Math.min(totalCount, to + pageSize - 1);

  const fetchData = (pageNum) => {
    setCurrentPage(pageNum);
    const rows = tableData.slice((pageNum - 1) * pageSize, pageNum * pageSize);
    setTableRows(rows);
  };

  useEffect(() => {
    fetchPoolPairsListStartedRequest(tokenId);
  }, []);

  useEffect(() => {
    setTableData(data);
  }, [data]);

  const sorter = (fieldName) => {
    const { field, mode } = sortedField;
    let flip = true;
    let updatedMode = (mode + 1) % 3;
    let updatedTableData = tableData;
    if (tableData.length) {
      if (fieldName !== field) {
        flip = true;
        updatedMode = 1;
      } else {
        if (updatedMode > 0) {
          if (updatedMode === 2) {
            flip = false;
          }

          if (updatedMode === 1) {
            flip = true;
          }
        } else {
          updatedTableData = data;
        }
      }
      const newCloneTableData = cloneDeep(updatedTableData);
      if (updatedMode === 0) {
        setTableData(newCloneTableData);
      } else {
        setTableData(newCloneTableData.sort(tableSorter(flip, fieldName)));
      }
      setSortedField({
        field: fieldName,
        mode: updatedMode,
      });
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [tableData]);

  const loadRows = () => {
    if (isError)
      return (
        <tr key='error'>
          <td>{isError}</td>
        </tr>
      );
    if (tableRows.length) {
      return loadTableRows();
    }
    if (!isLoading && totalCount === 0) {
      return (
        <tr key='noDataPresent'>
          <td colSpan={4}>
            {I18n.t('containers.poolPairsListPage.noDataPresent')}
          </td>
        </tr>
      );
    }
    return (
      <tr key={'Loading'}>
        <td colSpan={4}>{I18n.t('containers.poolPairsListPage.loading')}</td>
      </tr>
    );
  };

  const getTokensPriceRatio = (item) => {
    const itemA = new BigNumber(item['reserveA']);
    const itemB = new BigNumber(item['reserveB']);
    const ratioA = itemA.gt(0) ? itemB.dividedBy(itemA) : 0;
    const ratioB = itemB.gt(0) ? itemA.dividedBy(itemB) : 0;
    if (ratioA > ratioB) {
      return (
        <span>
          {numberWithCommas(ratioA, DEFAULT_DECIMAL_PLACE)}
          &nbsp;{item.tokenBSymbol}/{item.tokenASymbol}
        </span>
      );
    }
    return (
      <span>
        {numberWithCommas(ratioB, DEFAULT_DECIMAL_PLACE)}&nbsp;
        {item.tokenASymbol}/{item.tokenBSymbol}
      </span>
    );
  };

  const loadTableRows = useCallback(() => {
    return tableRows.map((item, id) => (
      <tr
        key={`${item.poolPairId}-${id}`}
        className={item.poolPairId === '8' ? styles.doge : ''}
      >
        <td className={styles.staticCol}>
          <PoolPairIcon
            symbolA={item.tokenASymbol}
            symbolB={item.tokenBSymbol}
          />
          &nbsp;
          <span>
            <div className={styles.iconTitle}>
              <Link
                to={setRoute(`${POOL_LIST_PAGE_URL_NAME}/${item.poolPairId}`)}
              >
                {item.pair}
              </Link>
            </div>
          </span>
        </td>
        <td className='text-right'>
          {numberWithCommas(item.totalStaked, DEFAULT_DECIMAL_PLACE)}
        </td>
        <td className='text-right'>
          {numberWithCommas(item.totalVolume, DEFAULT_DECIMAL_PLACE)}
        </td>
        <td colSpan={2} className='text-right'>
          <div className='d-flex justify-content-end align-items-center'>
            <div className='text-right'>
              {numberWithCommas(item.reserveA, DEFAULT_DECIMAL_PLACE)}&nbsp;
              {item.tokenASymbol}
            </div>
            <div className='px-1'>
              <RiAddLine />
            </div>
            <div className='text-right'>
              {numberWithCommas(item.reserveB, DEFAULT_DECIMAL_PLACE)}&nbsp;
              {item.tokenBSymbol}
            </div>
          </div>
        </td>
        <td className='text-right'>{getTokensPriceRatio(item)}</td>
        <td className={`text-right ${styles.pointer}`}>
          <span id={`infoText${id}`}>
            {numberWithCommas(item.totalApy, DEFAULT_DECIMAL_PLACE)}&nbsp;%
          </span>
          <UncontrolledTooltip
            target={`infoText${id}`}
            innerClassName='bg-white text-break w-90 h-50 border'
          >
            <PopoverBody>
              <div>
                {`${I18n.t(
                  'containers.poolPairsListPage.apy'
                )} : ${numberWithCommas(item.apy, DEFAULT_DECIMAL_PLACE)}`}
                &nbsp;%
              </div>
              <div>
                {`${I18n.t(
                  'containers.poolPairsListPage.commission'
                )} : ${numberWithCommas(
                  item.commission,
                  DEFAULT_DECIMAL_PLACE
                )}`}
                &nbsp;%
              </div>
            </PopoverBody>
          </UncontrolledTooltip>
        </td>
      </tr>
    ));
  }, [tableRows]);

  const getSortingIcon = (fieldName) => {
    const { field, mode } = sortedField;
    if (fieldName === field) {
      if (mode === 1) {
        return <MdArrowDownward className={styles.sortIcon} />;
      }
      if (mode === 2) {
        return <MdArrowUpward className={styles.sortIcon} />;
      }
    }
    return '';
  };

  return (
    <Row className='mt-5'>
      <Col xs='12'>
        <Card className={styles.card}>
          <div className={`${styles.tableResponsive} table-responsive-xl`}>
            <Table className={styles.table}>
              <thead>
                <tr>
                  <th>{I18n.t('containers.poolPairsListPage.name')}</th>
                  <th>
                    <Button
                      color='link'
                      className='d-flex float-right'
                      onClick={() => sorter('totalStaked')}
                    >
                      {I18n.t('containers.poolPairsListPage.totalLiquidity')}
                      &nbsp;
                      <span className={styles.subHeader}>
                        {I18n.t('containers.poolPairsListPage.usd')}
                      </span>
                      &nbsp;
                      {getSortingIcon('totalStaked')}
                    </Button>
                  </th>
                  <th>
                    <Button
                      color='link'
                      className='d-flex float-right'
                      onClick={() => sorter('totalVolume')}
                    >
                      {I18n.t('containers.poolPairsListPage.totalVolume')}
                      &nbsp;
                      <span className={styles.subHeader}>
                        {I18n.t('containers.poolPairsListPage.usd')}
                      </span>
                      &nbsp;
                      <span className={styles.subHeader}>
                        {I18n.t('containers.poolPairsListPage.24hr')}
                      </span>
                      &nbsp;
                      {getSortingIcon('totalVolume')}
                    </Button>
                  </th>
                  <th colSpan={2} className='text-right'>
                    {I18n.t('containers.poolPairsListPage.liquidity')}
                  </th>
                  <th className='text-right'>
                    {I18n.t('containers.poolPairsListPage.priceRatio')}
                  </th>
                  <th>
                    <Button
                      color='link'
                      className='d-flex float-right'
                      onClick={() => sorter('totalApy')}
                    >
                      {I18n.t('containers.poolPairsListPage.apy')}
                      &nbsp;
                      {getSortingIcon('totalApy')}
                    </Button>
                  </th>
                </tr>
              </thead>
              <tbody>{loadRows()}</tbody>
            </Table>
          </div>
        </Card>
      </Col>
      <Col xs='12'>
        {!!tableRows.length && (
          <Pagination
            label={I18n.t('containers.poolPairsListPage.paginationRange', {
              from,
              total: totalCount,
              to,
            })}
            currentPage={currentPage}
            pagesCount={pagesCount}
            handlePageClick={fetchData}
          />
        )}
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ poolPairsListPage, app }) => ({
  isLoading: poolPairsListPage.isLoading,
  data: poolPairsListPage.data,
  isError: poolPairsListPage.isError,
  unit: app.unit,
});

const mapDispatchToProps = {
  fetchPoolPairsListStartedRequest: (tokenId?: string | number) =>
    fetchPoolPairsListStartedRequest({ tokenId }),
};

export default connect(mapStateToProps, mapDispatchToProps)(PoolPairsTable);
