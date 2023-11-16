import { useEffect } from 'react';
import type { JSX, MouseEvent } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { CharacterList } from '@/components/character-list';
import { ExceptionButton } from '@/components/exception-button';
import { Pagination } from '@/components/pagination';
import { SearchForm } from '@/components/search-form';
import { Spinner } from '@/components/spinner';
import { useAppSearchParams } from '@/hooks/use-app-search-params';
import { HeaderLayout } from '@/layout/header-layout';
import { MainLayout } from '@/layout/main-layout';
import { useSearchQuery } from '@/services/api';
import { useAppSelector } from '@/store/hooks';
import { setItemsPerPage } from '@/store/slices/settings-slice';

import styles from './home-page.module.css';

export function HomePage(): JSX.Element {
  const { deleteParam, details, limit, page, query, setParams } = useAppSearchParams();
  const searchQuery = useAppSelector((state) => state.settings.searchQuery);
  const { data: apiResponse, isLoading } = useSearchQuery({ limit, name: searchQuery, page });
  const dispatch = useDispatch();

  const hasCharactersFound = (apiResponse?.characters.length ?? 0) > 0;
  const totalResults = apiResponse?.total ?? 0;

  useEffect(() => {
    if (query !== searchQuery) {
      setParams({ _page: '1', q: searchQuery });
    }
  }, [searchQuery, setParams, query]);

  function handleAsideClose(): void {
    if (details) {
      deleteParam('details');
    }
  }

  function handleMainContentClick(event: MouseEvent): void {
    event.stopPropagation();

    handleAsideClose();
  }

  function handleMainContentKeyPress(key: string): void {
    if (key === 'Escape') {
      handleAsideClose();
    }
  }

  function handleLimitChange(limit: number): void {
    dispatch(setItemsPerPage(limit));
    setParams({ _limit: `${limit}`, _page: '1' });
  }

  function handlePageChange(page: number): void {
    setParams({ _page: `${page}` });
  }

  return (
    <>
      <HeaderLayout>
        <>
          <SearchForm />
          <ExceptionButton />
        </>
      </HeaderLayout>
      <MainLayout>
        <>
          <section
            className={styles.mainContent}
            onClick={(e) => handleMainContentClick(e)}
            onKeyDown={(e) => handleMainContentKeyPress(e.key)}
            role="button"
            tabIndex={0}
          >
            {hasCharactersFound && (
              <Pagination
                currentPage={page}
                onLimitChange={handleLimitChange}
                onPageChange={handlePageChange}
                totalResults={totalResults}
              />
            )}
            {isLoading ? <Spinner /> : <CharacterList characters={apiResponse?.characters ?? []} />}
          </section>
          {details > 0 && <Outlet />}
        </>
      </MainLayout>
    </>
  );
}
