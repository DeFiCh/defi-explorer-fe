import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Row, Col, Card, Table, Button } from 'reactstrap';
import {
  TOKENS_LIST_PAGE_LIMIT,
  TOKEN_LIST_PAGE_URL_NAME,
} from '../../constants';
import { fetchTokensListStartedRequest } from './reducer';
import TokenAvatar from '../../components/TokenAvatar';
import Pagination from '../../components/Pagination';
import styles from './TokensListPage.module.scss';
import { numberWithCommas, setRoute, tableSorter } from '../../utils/utility';
import { cloneDeep } from 'lodash';
import { MdArrowDownward, MdArrowUpward } from 'react-icons/md';
import BigNumber from 'bignumber.js';

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
  const [tableData, setTableData] = useState<any[]>([]);
  const [sortedField, setSortedField] = useState<any>({
    field: '',
    mode: 0,
  });
  const pageSize = TOKENS_LIST_PAGE_LIMIT;
  const totalCount = tableData.length;
  const pagesCount = Math.ceil(totalCount / pageSize);
  const to = (currentPage - 1) * pageSize + 1;
  const from = Math.min(totalCount, to + pageSize - 1);

  const fetchData = (pageNum) => {
    const newCloneTableData = cloneDeep(tableData);
    setCurrentPage(pageNum);
    const rows = newCloneTableData.slice(
      (pageNum - 1) * pageSize,
      pageNum * pageSize
    );
    setTableRows(rows);
  };

  useEffect(() => {
    fetchTokensListStartedRequest();
  }, []);

  useEffect(() => {
    setTableData(data);
  }, [data]);

  useEffect(() => {
    fetchData(currentPage);
  }, [tableData]);

  const sorter = (fieldName) => {
    const { field, mode } = sortedField;
    let flip = true;
    let updatedMode = (mode + 1) % 3;
    let updatedTableData = tableData;
    if (tableData.length) {
      if (fieldName !== field) {
        flip = true;
        updatedMode = 1;
      } else {
        if (updatedMode > 0) {
          if (updatedMode === 2) {
            flip = false;
          }

          if (updatedMode === 1) {
            flip = true;
          }
        } else {
          updatedTableData = data;
        }
      }
      const newCloneTableData = cloneDeep(updatedTableData);
      if (updatedMode === 0) {
        setTableData(newCloneTableData);
      } else {
        setTableData(
          newCloneTableData.sort((a, b) => {
            if (fieldName === 'minted') {
              if (a.mintable === false) {
                return 1;
              }
              if (b.mintable === false) {
                return -1;
              }
            }
            return tableSorter(flip, fieldName)(a, b);
          })
        );
      }
      setSortedField({
        field: fieldName,
        mode: updatedMode,
      });
    }
  };

  const getSortingIcon = (fieldName) => {
    const { field, mode } = sortedField;
    if (fieldName === field) {
      if (mode === 1) {
        return <MdArrowDownward className={styles.sortIcon} />;
      }
      if (mode === 2) {
        return <MdArrowUpward className={styles.sortIcon} />;
      }
    }
    return '';
  };

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
          <td className={styles.staticCol}>
            <span className='pr-2'>
              <TokenAvatar symbol={item.symbolKey} />
            </span>
            &nbsp;
            <span>
              <div className={styles.iconTitle}>
                <Link
                  to={setRoute(`${TOKEN_LIST_PAGE_URL_NAME}/${item.tokenId}`)}
                >
                  {item.symbolKey}
                </Link>
              </div>
            </span>
          </td>
          <td className={styles.staticCol}>
            <div>{item.symbolKey}</div>
          </td>
          <td className={`${styles.staticCol} text-right`}>
            {item.mintable ? `${numberWithCommas(item.minted, 2)}` : '-'}
          </td>
        </tr>
      ));
    if (!isLoading && totalCount === 0) {
      return (
        <tr key='noDataPresent'>
          <td colSpan={5}>
            {I18n.t('containers.tokensPageList.noDataPresent')}
          </td>
        </tr>
      );
    }
    return (
      <tr key={'Loading'}>
        <td colSpan={5}>{I18n.t('containers.tokensPageList.loading')}</td>
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
                    <th>
                      <Button
                        color='link'
                        className='d-flex'
                        onClick={() => sorter('symbolKey')}
                      >
                        {I18n.t('containers.tokensPageList.symbol')}
                        &nbsp;
                        {getSortingIcon('symbolKey')}
                      </Button>
                    </th>
                    <th>
                      <Button
                        color='link'
                        className='d-flex float-right'
                        onClick={() => sorter('minted')}
                      >
                        {I18n.t('containers.tokensPageList.minted')}
                        &nbsp;
                        {getSortingIcon('minted')}
                      </Button>
                    </th>
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
