import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';
import { Link } from 'react-router-dom';
import {
  Row,
  Col,
  Card,
  Table,
  Button,
  UncontrolledTooltip,
  PopoverBody,
} from 'reactstrap';
import {
  DEFAULT_DECIMAL_PLACE,
  POOL_LIST_PAGE_URL_NAME,
  TOKENS_LIST_PAGE_LIMIT,
  MAINNET_EXPLORER,
  TESTNET_EXPLORER,
} from '../../../../constants';
import { fetchAnchorsListStartedRequest } from '../../reducer';
import Pagination from '../../../../components/Pagination';
import styles from '../../AnchorsPage.scss';
import {
  numberWithCommas,
  setRoute,
  tableSorter,
} from '../../../../utils/utility';
import { cloneDeep } from 'lodash';
import BigNumber from 'bignumber.js';
import { RiAddLine } from 'react-icons/ri';
import { MdArrowDownward, MdArrowUpward } from 'react-icons/md';

interface AnchorsTable {
  fetchAnchorsListStartedRequest: () => void;
  isLoading: boolean;
  data: any[];
  isError: string;
  network: string;
}

const AnchorsTable = (props: AnchorsTable) => {
  const { fetchAnchorsListStartedRequest, isLoading, data, isError } = props;

  const [currentPage, setCurrentPage] = useState(1);
  const [tableRows, setTableRows] = useState<any[]>([]);
  const [sortedField, setSortedField] = useState<any>({
    field: '',
    mode: 0,
  });
  const [tableData, setTableData] = useState<any[]>([]);
  const pageSize = TOKENS_LIST_PAGE_LIMIT;
  const totalCount = tableData.length;

  const API_PREFIX =
    props.network === 'mainnet' ? MAINNET_EXPLORER : TESTNET_EXPLORER;

  const pagesCount = Math.ceil(totalCount / pageSize);
  const to = (currentPage - 1) * pageSize + 1;
  const from = Math.min(totalCount, to + pageSize - 1);

  const fetchData = (pageNum) => {
    setCurrentPage(pageNum);
    const rows = tableData.slice((pageNum - 1) * pageSize, pageNum * pageSize);
    setTableRows(rows);
  };

  useEffect(() => {
    fetchAnchorsListStartedRequest();
  }, []);

  useEffect(() => {
    setTableData(data);
  }, [data]);

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

  useEffect(() => {
    fetchData(currentPage);
  }, [tableData]);

  const loadRows = () => {
    if (isError)
      return (
        <tr key='error'>
          <td>{isError}</td>
        </tr>
      );
    if (tableRows.length) {
      return loadTableRows();
    }
    if (!isLoading && totalCount === 0) {
      return (
        <tr key='noDataPresent'>
          <td colSpan={4}>
            {I18n.t('containers.anchorsListPage.noDataPresent')}
          </td>
        </tr>
      );
    }
    return (
      <tr key={'Loading'}>
        <td colSpan={4}>{I18n.t('containers.poolPairsListPage.loading')}</td>
      </tr>
    );
  };

  const loadTableRows = useCallback(() => {
    return tableRows.map((item, id) => (
      <tr key={`${item.anchorHeight}-${id}`}>
        <td>{item.anchorHeight}</td>
        <td>{item.btcAnchorHeight}</td>
        <td>
          <span>
            <div className={styles.iconTitle}>
              <a href={`${API_PREFIX}block/${item.anchorHash}`}>
                {item.anchorHash}
              </a>
            </div>
          </span>
        </td>
        <td>{item.rewardAddress}</td>
      </tr>
    ));
  }, [tableRows]);

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

  return (
    <Row className='mt-5'>
      <Col xs='12'>
        <Card className={styles.card}>
          <div className={`${styles.tableResponsive} table-responsive-xl`}>
            <Table className={styles.table}>
              <thead>
                <tr>
                  <th>
                    <Button
                      color='link'
                      className='d-flex'
                      onClick={() => sorter('anchorHeight')}
                    >
                      {I18n.t('containers.anchorsListPage.dfcHeight')}
                      {getSortingIcon('anchorHeight')}
                    </Button>
                  </th>
                  <th>
                    <Button
                      color='link'
                      className='d-flex'
                      onClick={() => sorter('btcAnchorHeight')}
                    >
                      {I18n.t('containers.anchorsListPage.btcHeight')}
                      {getSortingIcon('btcAnchorHeight')}
                    </Button>
                  </th>
                  <th>{I18n.t('containers.anchorsListPage.anchorHash')}</th>
                  <th>{I18n.t('containers.anchorsListPage.rewardAddress')}</th>
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
            label={I18n.t('containers.poolPairsListPage.paginationRange', {
              from,
              total: totalCount,
              to,
            })}
            currentPage={currentPage}
            pagesCount={pagesCount}
            handlePageClick={fetchData}
          />
        )}
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ anchorsListPage, app }) => ({
  isLoading: anchorsListPage.isLoading,
  data: anchorsListPage.data,
  isError: anchorsListPage.isError,
  unit: app.unit,
  network: app.network,
});

const mapDispatchToProps = {
  fetchAnchorsListStartedRequest: () => fetchAnchorsListStartedRequest({}),
};

export default connect(mapStateToProps, mapDispatchToProps)(AnchorsTable);
