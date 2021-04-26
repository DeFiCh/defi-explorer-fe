import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Row, Col, Card, Table, Button } from 'reactstrap';
import {
  ADDRESS_TOKENS_LIST_PAGE_LIMIT,
  DFI,
  TOKEN_LIST_PAGE_URL_NAME,
} from '../../../../constants';
import { fetchAddressTokensListStartedRequest } from '../../reducer';
import Pagination from '../../../../components/Pagination';
import styles from '../../TokensListPage.module.scss';
import {
  numberWithCommas,
  setRoute,
  tableSorter,
} from '../../../../utils/utility';
import { cloneDeep } from 'lodash';
import { MdArrowDownward, MdArrowUpward, MdSwapVert } from 'react-icons/md';
import TokenAvatar from '../../../../components/TokenAvatar';

interface RouteInfo {
  owner: string;
}

interface AddressTokenListProps extends RouteComponentProps<RouteInfo> {
  fetchAddressTokensListStartedRequest: (owner: string) => void;
  isLoading: boolean;
  data: any[];
  isError: string;
  unit: string;
}

const AddressTokenList = (props: AddressTokenListProps) => {
  const {
    fetchAddressTokensListStartedRequest,
    isLoading,
    data,
    isError,
    match: {
      params: { owner },
    },
  } = props;

  const [currentPage, setCurrentPage] = useState(1);
  const [tableRows, setTableRows] = useState<any[]>([]);
  const [tableData, setTableData] = useState<any[]>([]);
  const [sortedField, setSortedField] = useState<any>({
    field: '',
    mode: 0,
  });
  const pageSize = ADDRESS_TOKENS_LIST_PAGE_LIMIT;
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
    fetchAddressTokensListStartedRequest(owner);
  }, [owner]);

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
        setTableData(newCloneTableData.sort(tableSorter(flip, fieldName)));
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
      return tableRows.map((item, index) => (
        <tr key={`${item.name}-${index}`}>
          <td>
            <span className='pr-2'>
              <TokenAvatar symbol={item.tokenInfo.symbolKey} />
            </span>
            &nbsp;
            <span>
              <div className={styles.iconTitle}>
                <Link to={setRoute(`${TOKEN_LIST_PAGE_URL_NAME}/${item.id}`)}>
                  {item.tokenInfo.symbolKey}
                </Link>
              </div>
            </span>
          </td>
          <td className='text-right'>
            {numberWithCommas(item.balance)}
            {item.id === DFI ||
              (item.name === DFI && (
                <div className={styles.colorMuted}>
                  <p className='m-0'>
                    {`${I18n.t('containers.addresstokensListPage.utxos')}: ${
                      item.utxos
                    }`}
                  </p>
                  <p className='m-0'>
                    {`${I18n.t(
                      'containers.addresstokensListPage.dfiTokens'
                    )}:: ${item.tokenDFI}`}
                  </p>
                </div>
              ))}
          </td>
        </tr>
      ));
    if (!isLoading && totalCount === 0) {
      return (
        <tr key='noDataPresent'>
          <td colSpan={5}>
            {I18n.t('containers.addresstokensListPage.noDataPresent')}
          </td>
        </tr>
      );
    }
    return (
      <tr key={'Loading'}>
        <td colSpan={5}>
          {I18n.t('containers.addresstokensListPage.loading')}
        </td>
      </tr>
    );
  };

  return (
    <div>
      <h1 className='text-break'>{owner}</h1>
      <h5>
        {I18n.t('containers.addresstokensListPage.addressTokenListPageTitle')}
      </h5>
      <Row>
        <Col xs='12'>
          <Card className={styles.card}>
            <div className={`${styles.tableResponsive} table-responsive-xl`}>
              <Table className={styles.table}>
                <thead>
                  <tr>
                    <th>{I18n.t('containers.addresstokensListPage.name')}</th>
                    <th>
                      <Button
                        color='link'
                        className='d-flex float-right'
                        onClick={() => sorter('balance')}
                      >
                        {I18n.t('containers.addresstokensListPage.balance')}
                        &nbsp;
                        {getSortingIcon('balance')}
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
              label={I18n.t(
                'containers.addresstokensListPage.paginationRange',
                {
                  to,
                  total: totalCount,
                  from,
                }
              )}
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
    tokensListPage: {
      addressTokenList: { isLoading, data, isError },
    },
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
  fetchAddressTokensListStartedRequest: (owner: string) =>
    fetchAddressTokensListStartedRequest({ owner }),
};

export default connect(mapStateToProps, mapDispatchToProps)(AddressTokenList);
