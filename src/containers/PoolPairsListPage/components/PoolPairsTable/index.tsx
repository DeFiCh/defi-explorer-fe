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
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';

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
  const [sortedField, setSortedField] = useState<string>('totalLiquidity');
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

  useEffect(() => {
    if (!!tokenId) {
      setTableData(
        data.filter(
          (item) => item.idTokenA === tokenId || item.idTokenB === tokenId
        )
      );
    } else {
      setTableData(data);
    }
  }, [data]);

  const sorter = (fieldName) => {
    if (tableData.length) {
      const newCloneTableData = cloneDeep(tableData);
      const flip = sortedField !== fieldName;
      setTableData(newCloneTableData.sort(tableSorter(flip, fieldName)));
      if (flip) {
        setSortedField(fieldName);
      } else {
        setSortedField('');
      }
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
          <td>{I18n.t('containers.poolPairsListPage.noDataPresent')}</td>
        </tr>
      );
    }
    return (
      <tr key={'Loading'}>
        <td>{I18n.t('containers.poolPairsListPage.loading')}</td>
      </tr>
    );
  };

  const loadTableRows = useCallback(() => {
    return tableRows.map((item) => (
      <tr key={`${item.poolPairId}-${Math.random()}`}>
        <td>
          <span>
            <TokenAvatar token={item.tokenInfo.idTokenA} />
          </span>
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
    if (fieldName === sortedField) {
      return <MdArrowDropUp />;
    }
    return <MdArrowDropDown />;
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
                      <span>{getSortingIcon('commission')}</span>
                    </Button>
                  </th>
                  <th>
                    <Button
                      color='link'
                      className='d-flex'
                      onClick={() => sorter('totalLiquidity')}
                    >
                      {I18n.t('containers.poolPairsListPage.totalLiquidity')}
                      <span>{getSortingIcon('totalLiquidity')}</span>
                    </Button>
                  </th>
                  <th>
                    <Button
                      color='link'
                      className='d-flex'
                      onClick={() => sorter('apy')}
                    >
                      {I18n.t('containers.poolPairsListPage.apy')}
                      <span>{getSortingIcon('apy')}</span>
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
