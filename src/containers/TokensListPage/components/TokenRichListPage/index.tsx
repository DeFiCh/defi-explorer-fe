import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';
import { Link } from 'react-router-dom';
import { Card, Table, Row, Col } from 'reactstrap';
import { ADDRESS_BASE_PATH, RICH_LIST_PAGE_LIMIT } from '../../../../constants';
import Pagination from '../../../../components/Pagination';
import styles from './TokenRichListPage.module.scss';
import {
  fetchTokenRichListStarted,
  fetchTokenRichListSuccess,
} from './../../reducer';
import { numberWithCommas } from '../../../../utils/utility';

interface TokenRichListPageProps {
  isLoading: boolean;
  richListData: any;
  tokenId: string | number;
  isError: string;
  network: string;
  fetchTokenRichListStarted: (tokenId: string | number) => void;
  unit: string;
}

const TokenRichListPage = (props: TokenRichListPageProps) => {
  const {
    isLoading,
    tokenId,
    richListData: { data = [], total = 0 },
    isError,
    unit,
    network,
    fetchTokenRichListStarted,
  } = props;
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = RICH_LIST_PAGE_LIMIT;

  const pagesCount = Math.ceil(total / pageSize);
  const from = (currentPage - 1) * pageSize;
  const to = Math.min(from + pageSize, total);

  useEffect(() => {
    fetchTokenRichListStarted(tokenId);
    return () => {
      fetchTokenRichListSuccess([]);
    };
  }, []);

  const fetchData = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const loadRows = useCallback(() => {
    return data.slice(from, to).map((item) => (
      <tr key={item.address}>
        <td>
          <Link to={`/${network}${ADDRESS_BASE_PATH}/${item.address}`}>
            {item.address}
          </Link>
        </td>
        <td>
          <div className='float-right'>
            {numberWithCommas(item.balance)} {unit}
          </div>
        </td>
      </tr>
    ));
  }, [data, currentPage]);

  const richListHtmlPage = () => {
    if (isLoading)
      return (
        <tr>
          <td colSpan={2}>{I18n.t('containers.tokenPage.loading')}</td>
        </tr>
      );
    if (isError)
      return (
        <tr>
          <td colSpan={2}>{isError}</td>
        </tr>
      );
    return loadRows();
  };

  return (
    <>
      <h1>{I18n.t('containers.tokenPage.tokenRichList')}</h1>
      <Row>
        <Col xs='12'>
          <Card className={styles.card}>
            <div className={`${styles.tableResponsive} table-responsive-xl`}>
              <Table className={styles.table}>
                <thead>
                  <tr>
                    <th>{I18n.t('containers.tokenPage.address')}</th>
                    <th className='text-right'>
                      {I18n.t('containers.tokenPage.balance')}
                    </th>
                  </tr>
                </thead>
                <tbody>{richListHtmlPage()}</tbody>
              </Table>
            </div>
          </Card>
        </Col>
        <Col xs='12'>
          <Col xs='12'>
            <Pagination
              label={I18n.t('containers.tokenPage.paginationRange', {
                from: from + 1,
                total,
                to,
              })}
              currentPage={currentPage}
              pagesCount={pagesCount}
              handlePageClick={fetchData}
            />
          </Col>
        </Col>
      </Row>
    </>
  );
};

const mapStateToProps = (state: {
  tokensListPage: { richList: { isLoading: any; data: any; isError: any } };
  app: { network: string };
}) => {
  const {
    tokensListPage: {
      richList: { isLoading, data, isError },
    },
    app: { network },
  } = state;
  return {
    isLoading,
    richListData: { data, total: data.length },
    isError,
    network,
  };
};

const mapDispatchToProps = {
  fetchTokenRichListStarted: (tokenId: string | number) =>
    fetchTokenRichListStarted({ tokenId }),
};

export default connect(mapStateToProps, mapDispatchToProps)(TokenRichListPage);
