import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Card, Table, Row, Col } from 'reactstrap';
import {
  TRANSACTIONS_LIST_PAGE_LIMIT,
  TRANSACTION_BASE_PATH,
} from '../../constants';
import { fetchTransactionsListStarted, startPagination } from './reducer';
import Pagination from '../../components/Pagination';
import styles from './TransactionsListPage.module.scss';

interface TransactionsListPageProps extends RouteComponentProps {
  isLoading: boolean;
  transactions: any[];
  isError: string;
  total: number;
  fetchTransactionsListStarted: () => void;
  startPagination: (pageSize: number, pageNumber: number) => void;
}

const TransactionsListPage: React.FunctionComponent<TransactionsListPageProps> = (
  props: TransactionsListPageProps
) => {
  const {
    isLoading,
    transactions,
    isError,
    fetchTransactionsListStarted,
    total,
    startPagination,
  } = props;
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = TRANSACTIONS_LIST_PAGE_LIMIT;

  const pagesCount = Math.ceil(total / pageSize);
  const to = total - (currentPage - 1) * pageSize;
  const from = Math.max(to - pageSize, 0);

  useEffect(() => {
    fetchTransactionsListStarted();
  }, []);

  const fetchData = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    startPagination(pageSize, pageNumber - 1);
  };

  const loadRows = useCallback(() => {
    return transactions.map((item) => (
      <tr key={item.txid}>
        <td>
          <Link to={`${TRANSACTION_BASE_PATH}/${item.txid}`}>{item.txid}</Link>
        </td>
        <td>
          <div className='float-right'>{item.value}</div>
        </td>
      </tr>
    ));
  }, [transactions]);

  const transactionListHtmlPage = () => {
    if (isLoading)
      return <>{I18n.t('containers.transactionsListPage.loading')}</>;
    if (isError) return <> {isError}</>;
    return loadRows();
  };

  return (
    <div>
      <h1>
        {I18n.t('containers.transactionsListPage.TransactionsListPageTitle')}
      </h1>
      <Row>
        <Col xs='12'>
          <Card className={styles.card}>
            <div className={`${styles.tableResponsive} table-responsive-xl`}>
              <Table className={styles.table}>
                <thead>
                  <tr>
                    <th>{I18n.t('containers.transactionsListPage.txid')}</th>
                    <th className='text-right'>
                      {I18n.t('containers.transactionsListPage.value')}
                    </th>
                  </tr>
                </thead>
                <tbody>{transactionListHtmlPage()}</tbody>
              </Table>
            </div>
          </Card>
        </Col>
        <Col xs='12'>
          <Col xs='12'>
            <Pagination
              label={I18n.t('containers.transactionsListPage.paginationRange', {
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
    </div>
  );
};

const mapStateToProps = (state) => {
  const {
    transactionsListPage: { isLoading, data, isError, total },
  } = state;
  return {
    isLoading,
    transactions: data,
    isError,
    total,
  };
};

const mapDispatchToProps = {
  fetchTransactionsListStarted,
  startPagination: (pageSize: number, pageNumber: number) =>
    startPagination({ pageNumber, pageSize }),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransactionsListPage);
