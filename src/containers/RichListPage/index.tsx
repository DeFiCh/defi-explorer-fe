import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Card, Table, Row, Col } from 'reactstrap';
import { ADDRESS_BASE_PATH, mDFI, RICH_LIST_PAGE_LIMIT } from '../../constants';
import Pagination from '../../components/Pagination';
import styles from './RichListPage.module.scss';
import {
  fetchRichListStarted,
  startPagination,
  stopRichListCron,
} from './reducer';
import { getAmountInSelectedUnit } from '../../utils/utility';

interface RichListPageProps extends RouteComponentProps {
  isLoading: boolean;
  richListData: any;
  isError: string;
  fetchRichListStarted: (pageno: number, pagesize: number) => void;
  stopRichListCron: () => void;
  startPagination: (pageno: number, pagesize: number) => void;
  unit;
}

const RichListPage: React.FunctionComponent<RichListPageProps> = (
  props: RichListPageProps
) => {
  const {
    isLoading,
    richListData: { data = [], total = 0 },
    isError,
    unit,
    fetchRichListStarted,
    stopRichListCron,
    startPagination,
  } = props;
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = RICH_LIST_PAGE_LIMIT;

  const pagesCount = Math.ceil(total / pageSize);
  const to = total - (currentPage - 1) * pageSize;
  const from = Math.max(to - pageSize, 0);

  useEffect(() => {
    fetchRichListStarted(currentPage, pageSize);
    return () => {
      stopRichListCron();
    };
  }, []);

  const fetchData = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    startPagination(pageNumber, pageSize);
  };

  const loadRows = useCallback(() => {
    return data.map((item) => (
      <tr key={item.address}>
        <td>
          <Link to={`${ADDRESS_BASE_PATH}/${item.address}`}>
            {item.address}
          </Link>
        </td>
        <td>
          <div className='float-right'>
            {getAmountInSelectedUnit(item.balance, unit, mDFI)} {unit}
          </div>
        </td>
      </tr>
    ));
  }, [data]);

  const richListHtmlPage = () => {
    if (isLoading) return <>{I18n.t('containers.richListPage.loading')}</>;
    if (isError) return <>{isError}</>;
    return loadRows();
  };

  return (
    <div>
      <h1>{I18n.t('containers.richListPage.RichListPageTitle')}</h1>
      <Row>
        <Col xs='12'>
          <Card className={styles.card}>
            <div className={`${styles.tableResponsive} table-responsive-xl`}>
              <Table className={styles.table}>
                <thead>
                  <tr>
                    <th>{I18n.t('containers.richListPage.address')}</th>
                    <th className='text-right'>
                      {I18n.t('containers.richListPage.balance')}
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
              label={I18n.t('containers.richListPage.paginationRange', {
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
    richListPage: { isLoading, data, isError },
    app: { unit },
  } = state;
  return {
    isLoading,
    richListData: data,
    isError,
    unit,
  };
};

const mapDispatchToProps = {
  fetchRichListStarted: (pageno: number, pagesize: number) =>
    fetchRichListStarted({
      pageno,
      pagesize,
    }),
  stopRichListCron,
  startPagination: (pageno: number, pagesize: number) =>
    startPagination({
      pageno,
      pagesize,
    }),
};

export default connect(mapStateToProps, mapDispatchToProps)(RichListPage);
