import React, { useCallback } from 'react';
import { I18n } from 'react-redux-i18n';
import {
  Row,
  Col,
  Card,
  Table,
  Button,
  UncontrolledTooltip,
  PopoverBody,
} from 'reactstrap';
import { MdInfoOutline, MdArrowDownward, MdArrowUpward } from 'react-icons/md';
import Pagination from '../Pagination';
import styles from './CustomTable.module.scss';

interface CustomTable {
  column: any;
  data: any;
  total: number;
  isError?: string;
  isLoading?: boolean;
  pagination: boolean;
  sort: any;
  pageSize?: number;
  handlePageClick: (page: number) => void;
  handleSorting?: (sort: any) => void;
  currentPage?: number;
}

const CustomTable = (props: CustomTable) => {
  const {
    column,
    data,
    total,
    isError,
    isLoading,
    pagination,
    sort,
    pageSize,
    handlePageClick,
    handleSorting,
    currentPage,
  } = props;

  const perPage = pageSize || 10;

  const pagesCount = total ? Math.ceil(total / perPage) : 0;

  const loadRows = () => {
    if (isError) {
      return (
        <tr key='error'>
          <td>{isError}</td>
        </tr>
      );
    }
    if (data.length) {
      return loadTableRows();
    }
    if (!isLoading && total === 0) {
      return (
        <tr key='noDataPresent'>
          <td colSpan={4}>
            {I18n.t('containers.poolPairsListPage.noDataPresent')}
          </td>
        </tr>
      );
    }
    return (
      <tr key='Loading'>
        <td colSpan={4}>{I18n.t('containers.poolPairsListPage.loading')}</td>
      </tr>
    );
  };

  const getSortingIcon = (fieldName) => {
    const keys = Object.keys(sort);
    if (keys.length) {
      const field = Object.keys(sort)[0];
      const mode = sort[fieldName];
      if (fieldName === field) {
        if (mode === -1) {
          return <MdArrowDownward className={styles.sortIcon} />;
        }
        if (mode === 1) {
          return <MdArrowUpward className={styles.sortIcon} />;
        }
      }
    }
    return '';
  };

  const loadTableRows = useCallback(() => {
    return data.map((trItem, id) => (
      <tr key={id}>
        {column.map((tdItem, index) => (
          <td key={`${id}-${index}`}>{tdItem.cell(trItem)}</td>
        ))}
      </tr>
    ));
  }, [data]);

  const loadHeader = (item) => {
    if (item.sortable) {
      return (
        <th key={item.name}>
          <Button
            color='link'
            className='d-flex'
            onClick={() => (handleSorting ? handleSorting(item.field) : '')}
          >
            {I18n.t(item.name)}
            &nbsp;
            {getSortingIcon(item.field)}
            {item.tooltip && (
              <>
                <span id='infoText' className={styles.infoText}>
                  <MdInfoOutline className={styles.infoIcon} />
                </span>
                <UncontrolledTooltip
                  target='infoText'
                  innerClassName='bg-white text-break w-50 h-50 border'
                >
                  <PopoverBody>
                    <small>{item.tooltip}</small>
                  </PopoverBody>
                </UncontrolledTooltip>
              </>
            )}
          </Button>
        </th>
      );
    }
    return <th key={item.name}>{item.name}</th>;
  };

  return (
    <Row>
      <Col xs='12'>
        <Card className={styles.card}>
          <div className={`${styles.tableResponsive} table-responsive-sm`}>
            <Table className={styles.table}>
              <thead>
                <tr>{column.map((item) => loadHeader(item))}</tr>
              </thead>
              <tbody>{loadRows()}</tbody>
            </Table>
          </div>
        </Card>
      </Col>
      {pagination && (
        <Col xs='12'>
          {!!total && (
            <Pagination
              label={I18n.t('containers.poolPairsListPage.paginationRange', {
                from: 'from',
                total,
                to: 'to',
              })}
              currentPage={currentPage || 1}
              pagesCount={pagesCount}
              handlePageClick={handlePageClick}
            />
          )}
        </Col>
      )}
    </Row>
  );
};

export default CustomTable;
