import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import {
  MdFirstPage,
  MdChevronLeft,
  MdChevronRight,
  MdLastPage,
} from 'react-icons/md';
import { fetchPageNumbers } from '../../utils/utility';
import styles from './Pagination.module.scss';

interface IPaginationComponentProps {
  currentPage: number;
  pagesCount: number;
  label?: string;
  handlePageClick: (index: number) => void;
  showNextOnly?: boolean;
  disableNext?: boolean;
  className?: string;
}

const PaginationComponent: React.FunctionComponent<IPaginationComponentProps> = (
  props: IPaginationComponentProps
) => {
  const paginatedItems = (currentPage: number, pagesCount: number) => {
    return props.showNextOnly ? (
      <PaginationItem key={currentPage} active={true}>
        <PaginationLink onClick={(e) => props.handlePageClick(currentPage)}>
          {currentPage}
        </PaginationLink>
      </PaginationItem>
    ) : (
      fetchPageNumbers(currentPage, pagesCount, 1).map((pageNumber, index) => (
        <PaginationItem
          key={`${pageNumber}-${index}`}
          active={pageNumber === currentPage}
        >
          <PaginationLink onClick={(e) => props.handlePageClick(pageNumber)}>
            {pageNumber}
          </PaginationLink>
        </PaginationItem>
      ))
    );
  };

  const {
    currentPage,
    pagesCount,
    label,
    className = 'd-flex justify-content-between align-items-center mt-3',
  } = props;
  return (
    <div className={className}>
      <div>{label}</div>
      <Pagination className={styles.pagination}>
        {!props.showNextOnly && (
          <PaginationItem disabled={currentPage <= 1}>
            <PaginationLink first onClick={(e) => props.handlePageClick(1)}>
              <MdFirstPage />
            </PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem disabled={currentPage <= 1}>
          <PaginationLink
            previous
            onClick={(e) => props.handlePageClick(currentPage - 1)}
          >
            <MdChevronLeft />
          </PaginationLink>
        </PaginationItem>
        {paginatedItems(currentPage, pagesCount)}
        <PaginationItem disabled={currentPage >= pagesCount}>
          <PaginationLink
            next
            onClick={(e) => props.handlePageClick(currentPage + 1)}
            disabled={props.disableNext}
          >
            <MdChevronRight />
          </PaginationLink>
        </PaginationItem>
        {!props.showNextOnly && (
          <PaginationItem disabled={currentPage >= pagesCount}>
            <PaginationLink
              last
              onClick={(e) => props.handlePageClick(pagesCount)}
            >
              <MdLastPage />
            </PaginationLink>
          </PaginationItem>
        )}
      </Pagination>
    </div>
  );
};

export default PaginationComponent;
