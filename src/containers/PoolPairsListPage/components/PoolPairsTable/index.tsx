import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Table, Button } from 'reactstrap';
import {
  POOL_LIST_PAGE_URL_NAME,
  TOKENS_LIST_PAGE_LIMIT,
} from '../../../../constants';
import { fetchPoolPairsListStartedRequest } from '../../reducer';
import Pagination from '../../../../components/Pagination';
import styles from '../../PoolPairsListPage.module.scss';
import TokenAvatar from '../../../../components/TokenAvatar';
import {
  numberWithCommas,
  setRoute,
  tableSorter,
} from '../../../../utils/utility';
import { cloneDeep } from 'lodash';
import { BsArrowUpDown, BsArrowDown, BsArrowUp } from 'react-icons/bs';
import { RiAddLine } from 'react-icons/ri';

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

  const loadTableRows = useCallback(() => {
    return tableRows.map((item, id) => (
      <tr key={`${item.poolPairId}-${id}`}>
        <td className={styles.staticCol}>
          <span className='pr-2'>
            <TokenAvatar token={item.tokenInfo.idTokenA} />
            &nbsp;
            <TokenAvatar token={item.tokenInfo.idTokenB} />
          </span>
          &nbsp;
          <span>
            <div className={styles.iconTitle}>
              <Link
                to={setRoute(`${POOL_LIST_PAGE_URL_NAME}/${item.poolPairId}`)}
              >
                {item.symbol}
              </Link>
            </div>
          </span>
        </td>
        <td className='text-right'>{`${numberWithCommas(
          item.totalLiquidity.toFixed(2)
        )}`}</td>
        <td colSpan={2} className='text-right'>
          <Row>
            <Col xs='5' className='text-right'>
              {`${numberWithCommas(item.reserveA.toFixed(2))} ${
                item.tokenInfo.idTokenA.symbol
              }`}
            </Col>
            <Col xs='2'>
              <RiAddLine />
            </Col>
            <Col xs='5' className='text-right'>
              {`${numberWithCommas(item.reserveB.toFixed(2))} ${
                item.tokenInfo.idTokenB.symbol
              }`}
            </Col>
          </Row>
        </td>
        <td className='text-right'>
          {`${numberWithCommas(item['reserveA/reserveB'].toFixed(2))} ${
            item.tokenInfo.idTokenA.symbol
          }/${item.tokenInfo.idTokenB.symbol}`}
        </td>
        <td className='text-right'>{`${numberWithCommas(
          item.apy.toFixed(2)
        )} %`}</td>
        <td className='text-right'>
          {numberWithCommas(`${parseFloat(item.rewardPct) * 100}`)} %
        </td>
      </tr>
    ));
  }, [tableRows]);

  const getSortingIcon = (fieldName) => {
    const { field, mode } = sortedField;
    if (fieldName === field) {
      if (mode === 1) {
        return <BsArrowDown className={styles.sortIcon} />;
      }
      if (mode === 2) {
        return <BsArrowUp className={styles.sortIcon} />;
      }
    }
    return <BsArrowUpDown className={styles.sortIcon} />;
  };

  return (
    <Row>
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
                      onClick={() => sorter('totalLiquidity')}
                    >
                      {I18n.t('containers.poolPairsListPage.totalLiquidity')}
                      &nbsp;
                      {getSortingIcon('totalLiquidity')}
                    </Button>
                  </th>
                  <th colSpan={2} className='text-center'>
                    {I18n.t('containers.poolPairsListPage.liquidity')}
                  </th>
                  <th className='text-right'>
                    {I18n.t('containers.poolPairsListPage.priceRatio')}
                  </th>
                  <th>
                    <Button
                      color='link'
                      className='d-flex float-right'
                      onClick={() => sorter('apy')}
                    >
                      {I18n.t('containers.poolPairsListPage.apy')}
                      &nbsp;
                      {getSortingIcon('apy')}
                    </Button>
                  </th>
                  <th>
                    <Button
                      color='link'
                      className='d-flex float-right'
                      onClick={() => sorter('rewardPct')}
                    >
                      {I18n.t('containers.poolPairsListPage.rewardPct')}
                      &nbsp;
                      {getSortingIcon('rewardPct')}
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
