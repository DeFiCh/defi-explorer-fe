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
import { setRoute, tableSorter } from '../../../../utils/utility';
import { cloneDeep } from 'lodash';
import { BsArrowUpDown, BsArrowDown, BsArrowUp } from 'react-icons/bs';

interface PoolPairsTable {
  fetchPoolPairsListStartedRequest: () => void;
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
    fetchPoolPairsListStartedRequest();
  }, []);

  const prepareData = () => {
    if (!!tokenId) {
      return data.filter(
        (item) => item.idTokenA === tokenId || item.idTokenB === tokenId
      );
    }
    return data;
  };

  useEffect(() => {
    setTableData(prepareData());
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
          updatedTableData = prepareData();
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
          <span>
            <TokenAvatar token={item.tokenInfo.idTokenA} />
          </span>
          &nbsp;
          <span>
            <TokenAvatar token={item.tokenInfo.idTokenB} />
          </span>{' '}
          <Link to={setRoute(`${POOL_LIST_PAGE_URL_NAME}/${item.poolPairId}`)}>
            {item.symbol}
          </Link>
        </td>
        <td>
          <div>{parseFloat(item.commission) * 100}%</div>
        </td>
        <td>
          <div>{`$ ${item.totalLiquidity.toFixed(2)}`}</div>
        </td>
        <td>
          <div>{`$ ${item.apy.toFixed(2)}`}</div>
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
                      className='d-flex'
                      onClick={() => sorter('commission')}
                    >
                      {I18n.t('containers.poolPairsListPage.commission')}
                      &nbsp;
                      {getSortingIcon('commission')}
                    </Button>
                  </th>
                  <th>
                    <Button
                      color='link'
                      className='d-flex'
                      onClick={() => sorter('totalLiquidity')}
                    >
                      {I18n.t('containers.poolPairsListPage.totalLiquidity')}
                      &nbsp;
                      {getSortingIcon('totalLiquidity')}
                    </Button>
                  </th>
                  <th>
                    <Button
                      color='link'
                      className='d-flex'
                      onClick={() => sorter('apy')}
                    >
                      {I18n.t('containers.poolPairsListPage.apy')}
                      &nbsp;
                      {getSortingIcon('apy')}
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
  fetchPoolPairsListStartedRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(PoolPairsTable);
