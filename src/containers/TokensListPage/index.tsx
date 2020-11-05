import capitalize from 'lodash/capitalize';
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
  const to = (currentPage - 1) * pageSize + 1;
  const from = Math.min(totalCount, to + pageSize - 1);

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
          <td>
            <div>{item.mintable ? `${item.minted} ${item.symbol}` : '-'}</div>
          </td>
          <td>
            <div>{capitalize(item.tradeable)}</div>
          </td>
        </tr>
      ));
    if (!isLoading && totalCount === 0) {
      return (
        <tr key='noDataPresent'>
          <td>{I18n.t('containers.tokensPageList.noDataPresent')}</td>
        </tr>
      );
    }
    return (
      <tr key={'Loading'}>
        <td>{I18n.t('containers.tokensPageList.loading')}</td>
      </tr>
    );
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
                    <th>{I18n.t('containers.tokensPageList.minted')}</th>
                    <th>{I18n.t('containers.tokensPageList.tradeable')}</th>
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
              label={I18n.t('containers.tokensPageList.paginationRange', {
                to,
                total: totalCount,
                from,
              })}
              currentPage={currentPage}
              pagesCount={pagesCount}
              handlePageClick={fetchData}
            />
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (state) => {
  const {
    tokensListPage: { isLoading, data, isError },
    app: { unit },
  } = state;
  return {
    isLoading,
    data,
    isError,
    unit,
  };
};

const mapDispatchToProps = {
  fetchTokensListStartedRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(TokensListPage);
