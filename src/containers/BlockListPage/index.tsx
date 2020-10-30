import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Card, Table, Row, Col } from 'reactstrap';
import { BLOCKS_LIST_PAGE_LIMIT, BLOCK_PAGE_BASE_PATH } from '../../constants';
import { fetchBlocksListStarted, startPagination } from './reducer';
import Pagination from '../../components/Pagination';
import styles from './BlockListPage.module.scss';

interface BlockListPageProps extends RouteComponentProps {
  isLoading: boolean;
  blocks: any[];
  isError: string;
  total: number;
  fetchBlocksListStarted: (anchorsOnly: boolean, pageSize: number) => void;
  startPagination: (
    pageNumber: number,
    pageSize: number,
    anchorsOnly: boolean
  ) => void;
  anchorsOnly?: boolean;
}
// TODO: Anchored page is in work in progress
const BlockListPage: React.FunctionComponent<BlockListPageProps> = (
  props: BlockListPageProps
) => {
  const {
    isLoading,
    blocks,
    isError,
    fetchBlocksListStarted,
    total,
    startPagination,
    anchorsOnly,
  } = props;
  const [currentPage, setCurrentPage] = useState(1);

  const totalCount = anchorsOnly ? blocks.length : total;

  const pageSize = BLOCKS_LIST_PAGE_LIMIT;

  const pagesCount = Math.ceil(totalCount / pageSize);
  const to = totalCount - (currentPage - 1) * pageSize;
  const from = Math.max(to - pageSize, 0);

  useEffect(() => {
    fetchBlocksListStarted(!!anchorsOnly, pageSize);
  }, []);

  const fetchData = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    startPagination(pageNumber, pageSize, !!anchorsOnly);
  };

  const loadRows = useCallback(() => {
    if (isLoading) return <>{I18n.t('containers.blockpageList.loading')}</>;
    if (isError) return <>{isError}</>;
    return blocks.map((block) => (
      <tr key={block.hash}>
        <td>
          <Link to={`${BLOCK_PAGE_BASE_PATH}/${block.hash}`}>
            {block.height}
          </Link>
        </td>
        <td>
          <div>{moment(block.time).fromNow()}</div>
        </td>
        <td>
          <div>{block.transactionCount}</div>
        </td>
        <td>
          <div>{block.size}</div>
        </td>
      </tr>
    ));
  }, [blocks]);

  return (
    <div>
      <h1>{I18n.t('containers.blockpageList.blockListPageTitle')}</h1>
      <Row>
        <Col xs='12'>
          <Card className={styles.card}>
            <div className={`${styles.tableResponsive} table-responsive-xl`}>
              <Table className={styles.table}>
                <thead>
                  <tr>
                    <th>{I18n.t('containers.blockpageList.height')}</th>
                    <th>{I18n.t('containers.blockpageList.time')}</th>
                    <th>
                      {I18n.t('containers.blockpageList.transactionCount')}
                    </th>
                    <th>{I18n.t('containers.blockpageList.size')}</th>
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
              label={I18n.t('containers.blockpageList.paginationRange', {
                from: from ? from + 1 : 0,
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

const mapStateToProps = (state) => {
  const {
    blockListPage: { isLoading, data, isError, total },
  } = state;
  return {
    isLoading,
    blocks: data,
    isError,
    total,
  };
};

const mapDispatchToProps = {
  fetchBlocksListStarted: (anchorsOnly: boolean, pageSize: number) =>
    fetchBlocksListStarted({ anchorsOnly, pageSize }),
  startPagination: (
    pageNumber: number,
    pageSize: number,
    anchorsOnly: boolean
  ) => startPagination({ pageNumber, pageSize, anchorsOnly }),
};

export default connect(mapStateToProps, mapDispatchToProps)(BlockListPage);
