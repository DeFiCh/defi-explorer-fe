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
  startPagination: (pageNumber: number) => void;
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
    startPagination(pageNumber);
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

  const blockHtmlPage = () => {
    if (isLoading) return <>{I18n.t('containers.transactionsList.loading')}</>;
    if (isError) return <> {isError}</>;
    return (
      <div className={`${styles.tableResponsive} table-responsive-xl`}>
        <Table className={styles.table}>
          <thead>
            <tr>
              <th>{I18n.t('containers.transactionsList.txid')}</th>
              <th>{I18n.t('containers.transactionsList.value')}</th>
            </tr>
          </thead>
          <tbody>{loadRows()}</tbody>
        </Table>
      </div>
    );
  };
  return (
    <div>
      <h1>{I18n.t('containers.transactionsList.TransactionsListPageTitle')}</h1>
      <Row>
        <Col xs='12'>
          <Card className={styles.card}>{blockHtmlPage()}</Card>
        </Col>
        <Col xs='12'>
          <Col xs='12'>
            <Pagination
              label={I18n.t('containers.transactionsList.paginationRange', {
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
    TransactionsListPage: { isLoading, data, isError, total },
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
  startPagination: (pageNumber: number) => startPagination({ pageNumber }),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransactionsListPage);
