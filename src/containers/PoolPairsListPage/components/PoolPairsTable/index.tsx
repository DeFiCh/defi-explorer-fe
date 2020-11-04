import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Table } from 'reactstrap';
import { POOL_BASE_PATH, TOKENS_LIST_PAGE_LIMIT } from '../../../../constants';
import { fetchPoolPairsListStartedRequest } from '../../reducer';
import Pagination from '../../../../components/Pagination';
import styles from '../../PoolPairsListPage.module.scss';
import TokenAvatar from '../../../../components/TokenAvatar';

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
  let filteredData = data;
  if (!!tokenId) {
    filteredData = filteredData.filter(
      (item) => item.idTokenA === tokenId || item.idTokenB === tokenId
    );
  }
  const pageSize = TOKENS_LIST_PAGE_LIMIT;
  const totalCount = filteredData.length;

  const pagesCount = Math.ceil(totalCount / pageSize);
  const to = totalCount - (currentPage - 1) * pageSize;
  const from = Math.max(to - pageSize, 0);

  const fetchData = (pageNum) => {
    setCurrentPage(pageNum);
    const rows = filteredData.slice(
      (pageNum - 1) * pageSize,
      pageNum * pageSize
    );
    setTableRows(rows);
  };

  useEffect(() => {
    fetchPoolPairsListStartedRequest();
  }, []);

  useEffect(() => {
    fetchData(currentPage);
  }, [data]);

  const loadRows = () => {
    if (isLoading)
      return (
        <tr key={'Loading'}>
          <td>{I18n.t('containers.poolPairsListPage.loading')}</td>
        </tr>
      );
    if (isError)
      return (
        <tr key='error'>
          <td>{isError}</td>
        </tr>
      );
    if (tableRows.length)
      return tableRows.map((item) => (
        <tr key={item.poolPairId}>
          <td>
            <span>
              <TokenAvatar token={item.tokenInfo.idTokenA} />
            </span>
            <span>
              <TokenAvatar token={item.tokenInfo.idTokenB} />
            </span>{' '}
            <Link to={`${POOL_BASE_PATH}/${item.poolPairId}`}>
              {item.symbol}
            </Link>
          </td>
          <td>
            <div>{parseFloat(item.commission) * 100}%</div>
          </td>
        </tr>
      ));
    if (totalCount === 0) {
      return (
        <tr key='noDataPresent'>
          <td>{I18n.t('containers.poolPairsListPage.noDataPresent')}</td>
        </tr>
      );
    }
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
                  <th>{I18n.t('containers.poolPairsListPage.commission')}</th>
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
              from: from + 1,
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
