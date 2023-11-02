import type { JSX } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import cn from 'classnames';
import featherIcons from 'feather-icons/dist/feather-sprite.svg';

import { getLink, updateSearchParams } from '@/lib/search-params';

import styles from './pagination.module.css';

type Props = {
  currentPage: number;
  itemsPerPage: number;
  totalResults: number;
};

export function Pagination({ currentPage, itemsPerPage, totalResults }: Props): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();
  const lastPageNum = Math.ceil(totalResults / itemsPerPage);
  const isPrevDisabled = currentPage === 1;
  const isNextDisabled = currentPage === lastPageNum;

  function handleItemsPerPageChange(value: string): void {
    const newParams = updateSearchParams(searchParams, { _limit: `${value}`, _page: '1' });

    setSearchParams(newParams);
  }

  return (
    <nav className={styles.pagination}>
      <ul className={styles.paginationList}>
        <li className="page-item">
          <Link className={styles.pageLink} to={getLink(searchParams, { _page: '1' })}>
            <svg className="feather">
              <use href={`${featherIcons}#arrow-left-circle`} />
            </svg>
          </Link>
        </li>
        <li className="page-item">
          <Link
            className={cn(styles.pageLink, { [styles.disabled]: isPrevDisabled })}
            to={getLink(searchParams, { _page: `${currentPage - 1}` })}
          >
            <svg className="feather">
              <use href={`${featherIcons}#arrow-left`} />
            </svg>
          </Link>
        </li>
        <li>
          <span className={styles.pageText}>{`${currentPage} of ${lastPageNum}`}</span>
        </li>
        <li className="page-item">
          <Link
            className={cn(styles.pageLink, { [styles.disabled]: isNextDisabled })}
            to={getLink(searchParams, { _page: `${currentPage + 1}` })}
          >
            <svg className="feather">
              <use href={`${featherIcons}#arrow-right`} />
            </svg>
          </Link>
        </li>
        <li className="page-item">
          <Link className={styles.pageLink} to={getLink(searchParams, { _page: `${lastPageNum}` })}>
            <svg className="feather">
              <use href={`${featherIcons}#arrow-right-circle`} />
            </svg>
          </Link>
        </li>
      </ul>
      <select
        className={styles.select}
        name="itemsPerPage"
        onChange={(e) => handleItemsPerPageChange(e.target.value)}
        value={itemsPerPage}
      >
        {[5, 10, 20, 30, 40, 50].map((itemCount) => (
          <option key={itemCount} value={itemCount}>
            {itemCount}
          </option>
        ))}
      </select>
    </nav>
  );
}
