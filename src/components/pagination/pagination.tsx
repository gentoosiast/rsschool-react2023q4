import type { ReactNode } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import cn from 'classnames';
import featherIcons from 'feather-icons/dist/feather-sprite.svg';

import { getLink } from '@/lib/search-params';

import { RESULTS_PER_PAGE_OPTIONS } from './constants';
import { generatePageNumbers } from './generate-page-numbers';

import styles from './pagination.module.css';

type Props = {
  currentPage: number;
  itemsPerPage: number;
  onLimitChange: (limit: number) => void;
  totalResults: number;
};

export function Pagination({
  currentPage,
  itemsPerPage,
  onLimitChange,
  totalResults,
}: Props): ReactNode {
  const [searchParams] = useSearchParams();
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
          <Link className={styles.pageLink} to={getLink(searchParams, '_page', '1')}>
            <svg className="feather">
              <use href={`${featherIcons}#arrow-left-circle`} />
            </svg>
          </Link>
        </li>
        <li>
          <Link
            className={cn(styles.pageLink, { [styles.disabled]: isPrevDisabled })}
            to={getLink(searchParams, '_page', `${currentPage - 1}`)}
          >
            <svg className="feather">
              <use href={`${featherIcons}#arrow-left`} />
            </svg>
          </Link>
        </li>
        {pageNumbers.map((pageNumber) => (
          <li key={pageNumber}>
            <Link
              className={cn(styles.pageLink, {
                [styles.pageLinkActive]: pageNumber === currentPage,
              })}
              to={getLink(searchParams, '_page', `${pageNumber}`)}
            >
              {pageNumber}
            </Link>
          </li>
        ))}
        <li>
          <Link
            className={cn(styles.pageLink, {
              [styles.pageLinkActive]: lastPageNum === currentPage,
            })}
            to={getLink(searchParams, '_page', `${lastPageNum}`)}
          >
            {`… ${lastPageNum}`}
          </Link>
        </li>
        <li>
          <Link
            className={cn(styles.pageLink, { [styles.disabled]: isNextDisabled })}
            to={getLink(searchParams, '_page', `${currentPage + 1}`)}
          >
            <svg className="feather">
              <use href={`${featherIcons}#arrow-right`} />
            </svg>
          </Link>
        </li>
        <li>
          <Link className={styles.pageLink} to={getLink(searchParams, '_page', `${lastPageNum}`)}>
            <svg className="feather">
              <use href={`${featherIcons}#arrow-right-circle`} />
            </svg>
          </Link>
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
