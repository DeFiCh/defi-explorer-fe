import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Row, Col, Card, Table } from 'reactstrap';
import { TOKENS_LIST_PAGE_LIMIT, TOKEN_BASE_PATH } from '../../constants';
import { fetchTokensListStartedRequest } from './reducer';
import TokenAvatar from '../../components/TokenAvatar';
import Pagination from '../../components/Pagination';
import styles from './TokensListPage.module.scss';

interface TokensListPageProps extends RouteComponentProps {
  fetchTokensListStartedRequest: () => void;
  isLoading: boolean;
  data: any[];
  isError: string;
  unit: string;
}

const TokensListPage = (props: TokensListPageProps) => {
  const { fetchTokensListStartedRequest, isLoading, data, isError } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const [tableRows, setTableRows] = useState<any[]>([]);
  const pageSize = TOKENS_LIST_PAGE_LIMIT;
  const totalCount = data.length;

  const pagesCount = Math.ceil(totalCount / pageSize);
  const to = totalCount - (currentPage - 1) * pageSize;
  const from = Math.max(to - pageSize, 0);

  const fetchData = (pageNum) => {
    setCurrentPage(pageNum);
    const rows = data.slice((pageNum - 1) * pageSize, pageNum * pageSize);
    setTableRows(rows);
  };

  useEffect(() => {
    fetchTokensListStartedRequest();
  }, []);

  useEffect(() => {
    fetchData(currentPage);
  }, [data]);

  const loadRows = () => {
    if (isLoading)
      return (
        <tr key={'Loading'}>
          <td>{I18n.t('containers.tokensPageList.loading')}</td>
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
        <tr key={item.tokenId}>
          <td>
            <span>
              <TokenAvatar token={item} />
            </span>{' '}
            <Link to={`${TOKEN_BASE_PATH}/${item.tokenId}`}>
              {item.name || 'Unknown'}
            </Link>
          </td>
          <td>
            <div>{item.symbol}</div>
          </td>
          <td>
            <div>{item.category}</div>
          </td>
        </tr>
      ));
  };

  return (
    <div>
      <h1>{I18n.t('containers.tokensPageList.tokensPageListTitle')}</h1>
      <Row>
        <Col xs='12'>
          <Card className={styles.card}>
            <div className={`${styles.tableResponsive} table-responsive-xl`}>
              <Table className={styles.table}>
                <thead>
                  <tr>
                    <th>{I18n.t('containers.tokensPageList.name')}</th>
                    <th>{I18n.t('containers.tokensPageList.symbol')}</th>
                    <th>{I18n.t('containers.tokensPageList.category')}</th>
                  </tr>
                </thead>
                <tbody>{loadRows()}</tbody>
              </Table>
            </div>
          </Card>
        </Col>
        <Col xs='12'>
          <Col xs='12'>
            <Pagination
              label={I18n.t('containers.tokensPageList.paginationRange', {
                from: from + 1,
                total: totalCount,
                to,
              })}
              currentPage={currentPage}
              pagesCount={pagesCount}
              handlePageClick={fetchData}
            />
          </Col>
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = ({ tokensListPage, app }) => ({
  isLoading: tokensListPage.isLoading,
  data: tokensListPage.data,
  isError: tokensListPage.isError,
  unit: app.unit,
});

const mapDispatchToProps = {
  fetchTokensListStartedRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(TokensListPage);
