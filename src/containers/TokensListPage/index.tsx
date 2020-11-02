import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Row, Col, Card, Table } from 'reactstrap';
import { TOKENS_LIST_PAGE_LIMIT, TOKEN_BASE_PATH } from '../../constants';
import { fetchTokensListStartedRequest } from './reducer';
import styles from './TokensListPage.module.scss';

interface TokensListPageProps extends RouteComponentProps {
  fetchTokensListStartedRequest: (pageNumber: number, pageSize: number) => void;
  isLoading: boolean;
  data: any[];
  isError: string;
  unit: string;
}

const TokensListPage = (props: TokensListPageProps) => {
  const {
    fetchTokensListStartedRequest,
    isLoading,
    data,
    isError,
    unit,
  } = props;
  const [curretPage, setCurretPage] = useState(1);
  const pageSize = TOKENS_LIST_PAGE_LIMIT;

  useEffect(() => {
    fetchTokensListStartedRequest(curretPage, pageSize);
  }, []);

  const loadRows = () => {
    if (isLoading) return I18n.t('containers.tokensPageList.loading');
    if (isError) return isError;
    if (data.length)
      return data.map((item) => (
        <tr key={item.tokenId}>
          <td>
            <Link to={`${TOKEN_BASE_PATH}/${item.tokenId}`}>{item.name}</Link>
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
          {/* <Col xs='12'>
        <Pagination
          label={I18n.t('containers.tokensPageList.paginationRange', {
            from: from ? from + 1 : 0,
            total: totalCount,
            to,
          })}
          currentPage={currentPage}
          pagesCount={pagesCount}
          handlePageClick={fetchData}
        />
      </Col> */}
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
  fetchTokensListStartedRequest: (pageNumber, pageSize) =>
    fetchTokensListStartedRequest({
      pageNumber,
      pageSize,
    }),
};

export default connect(mapStateToProps, mapDispatchToProps)(TokensListPage);
