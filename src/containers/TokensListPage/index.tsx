import capitalize from 'lodash/capitalize';
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
import { setRoute, tableSorter } from '../../utils/utility';
import { cloneDeep } from 'lodash';
import { FaSortDown, FaSortUp, FaSort } from 'react-icons/fa';

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
        return <FaSortDown className={styles.sortIcon} />;
      }
      if (mode === 2) {
        return <FaSortUp className={styles.sortIcon} />;
      }
    }
    return <FaSort className={styles.sortIcon} />;
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
          <td>
            <span>
              <TokenAvatar token={item} />
            </span>{' '}
            <Link to={setRoute(`${TOKEN_LIST_PAGE_URL_NAME}/${item.tokenId}`)}>
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
            <div>
              {item.mintable ? `${parseFloat(item.minted).toFixed(2)}` : '-'}
            </div>
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
                    <th>
                      <Button
                        color='link'
                        className='d-flex'
                        onClick={() => sorter('symbol')}
                      >
                        {I18n.t('containers.tokensPageList.symbol')}
                        {getSortingIcon('symbol')}
                      </Button>
                    </th>
                    <th>
                      <Button
                        color='link'
                        className='d-flex'
                        onClick={() => sorter('category')}
                      >
                        {I18n.t('containers.tokensPageList.category')}
                        {getSortingIcon('category')}
                      </Button>
                    </th>
                    <th>
                      <Button
                        color='link'
                        className='d-flex'
                        onClick={() => sorter('minted')}
                      >
                        {I18n.t('containers.tokensPageList.minted')}
                        {getSortingIcon('minted')}
                      </Button>
                    </th>
                    <th>
                      <Button
                        color='link'
                        className='d-flex'
                        onClick={() => sorter('tradeable')}
                      >
                        {I18n.t('containers.tokensPageList.tradeable')}
                        {getSortingIcon('tradeable')}
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
