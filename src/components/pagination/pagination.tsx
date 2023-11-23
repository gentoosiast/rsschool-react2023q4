import type { ReactNode } from 'react';
import { Icon } from '@/components/icon';

import { clsx } from 'clsx';

import { useAppSelector } from '@/store/hooks';

import { RESULTS_PER_PAGE_OPTIONS } from './constants';
import { generatePageNumbers } from './generate-page-numbers';

import styles from './pagination.module.css';

type Props = {
  currentPage: number;
  onLimitChange: (limit: number) => void;
  onPageChange: (page: number) => void;
  totalResults: number;
};

export function Pagination({
  currentPage,
  onLimitChange,
  onPageChange,
  totalResults,
}: Props): ReactNode {
  const itemsPerPage = useAppSelector((state) => state.settings.itemsPerPage);
  const lastPageNum = Math.ceil(totalResults / itemsPerPage);
  const isPrevDisabled = currentPage === 1;
  const isNextDisabled = currentPage === lastPageNum;
  const pageNumbers = generatePageNumbers(currentPage, lastPageNum - 1);

  if (totalResults === 0) {
    return null;
  }

  return (
    <nav className={styles.pagination}>
      <ul className={styles.paginationList}>
        <li>
          <button
            aria-label="Go to the first page"
            className={styles.pageLink}
            onClick={() => onPageChange(1)}
          >
            <Icon name="arrow-left-circle" />
          </button>
        </li>
        <li>
          <button
            aria-label="Go to the previous page"
            className={clsx(styles.pageLink, { [styles.disabled]: isPrevDisabled })}
            onClick={() => onPageChange(currentPage - 1)}
          >
            <Icon name="arrow-left" />
          </button>
        </li>
        {pageNumbers.map((pageNumber) => (
          <li key={pageNumber}>
            <button
              aria-label={`Go to the page ${pageNumber}`}
              className={clsx(styles.pageLink, {
                [styles.pageLinkActive]: pageNumber === currentPage,
              })}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          </li>
        ))}
        <li>
          <button
            aria-label="Go to the last page"
            className={clsx(styles.pageLink, {
              [styles.pageLinkActive]: lastPageNum === currentPage,
            })}
            onClick={() => onPageChange(lastPageNum)}
          >
            {`… ${lastPageNum}`}
          </button>
        </li>
        <li>
          <button
            aria-label="Go to the next page"
            className={clsx(styles.pageLink, { [styles.disabled]: isNextDisabled })}
            onClick={() => onPageChange(currentPage + 1)}
          >
            <Icon name="arrow-right" />
          </button>
        </li>
        <li>
          <button
            aria-label="Go to the last page"
            className={styles.pageLink}
            onClick={() => onPageChange(lastPageNum)}
          >
            <Icon name="arrow-right-circle" />
          </button>
        </li>
      </ul>
      <select
        className={styles.select}
        name="itemsPerPage"
        onChange={(e) => onLimitChange(+e.target.value)}
        value={itemsPerPage}
      >
        {RESULTS_PER_PAGE_OPTIONS.map((itemCount) => (
          <option key={itemCount} value={itemCount}>
            {itemCount}
          </option>
        ))}
      </select>
    </nav>
  );
}
