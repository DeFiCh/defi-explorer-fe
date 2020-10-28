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
  fetchBlocksListStarted: () => void;
  startPagination: (pageNumber: number) => void;
}

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
  } = props;
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = BLOCKS_LIST_PAGE_LIMIT;

  const pagesCount = Math.ceil(total / pageSize);
  const to = total - (currentPage - 1) * pageSize;
  const from = Math.max(to - pageSize, 0);

  useEffect(() => {
    fetchBlocksListStarted();
  }, []);

  const fetchData = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    startPagination(pageNumber);
  };

  const loadRows = useCallback(() => {
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

  const blockHtmlPage = () => {
    if (isLoading) return <>{I18n.t('containers.blockpageList.loading')}</>;
    if (isError) return <> {isError}</>;
    return (
      <div className={`${styles.tableResponsive} table-responsive-xl`}>
        <Table className={styles.table}>
          <thead>
            <tr>
              <th>{I18n.t('containers.blockpageList.height')}</th>
              <th>{I18n.t('containers.blockpageList.time')}</th>
              <th>{I18n.t('containers.blockpageList.transactionCount')}</th>
              <th>{I18n.t('containers.blockpageList.size')}</th>
            </tr>
          </thead>
          <tbody>{loadRows()}</tbody>
        </Table>
      </div>
    );
  };
  return (
    <div>
      <h1>{I18n.t('containers.blockpageList.blockListPageTitle')}</h1>
      <Row>
        <Col xs='12'>
          <Card className={styles.card}>{blockHtmlPage()}</Card>
        </Col>
        <Col xs='12'>
          <Col xs='12'>
            <Pagination
              label={I18n.t('containers.blockpageList.paginationRange', {
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
  fetchBlocksListStarted,
  startPagination: (pageNumber: number) => startPagination({ pageNumber }),
};

export default connect(mapStateToProps, mapDispatchToProps)(BlockListPage);
