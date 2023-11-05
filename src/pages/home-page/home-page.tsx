import { useCallback, useEffect, useState } from 'react';
import type { JSX, MouseEvent } from 'react';
import { Outlet } from 'react-router-dom';

import type { ApiResponse } from '@/services/api';

import { CharacterList } from '@/components/character-list';
import { ExceptionButton } from '@/components/exception-button';
import { Pagination } from '@/components/pagination';
import { SearchForm } from '@/components/search-form';
import { Spinner } from '@/components/spinner';
import { useParams } from '@/hooks/use-params';
import { HeaderLayout } from '@/layout/header-layout';
import { MainLayout } from '@/layout/main-layout';
import { rickAndMortyApi } from '@/services/api';

import styles from './home-page.module.css';

export function HomePage(): JSX.Element {
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { deleteParam, details, limit, page, query, setParams } = useParams();

  const hasCharactersFound = (apiResponse?.characters.length ?? 0) > 0;
  const totalResults = apiResponse?.total ?? 0;

  const handleSearchQueryChange = useCallback(
    (query: string): void => {
      if (query) {
        setParams({ q: query });
      }
    },
    [setParams],
  );

  useEffect(() => {
    const controller = new AbortController();

    setIsLoading(true);

    void rickAndMortyApi
      .search(controller, query, page, limit)
      .then((response) => {
        setApiResponse(response);
      })
      .finally(() => {
        setIsLoading(false);
      });

    return () => {
      controller.abort();
    };
  }, [page, limit, query]);

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
    setParams({ _limit: `${limit}`, _page: '1' });
  }

  function handlePageChange(page: number): void {
    setParams({ _page: `${page}` });
  }

  return (
    <>
      <HeaderLayout>
        <>
          <SearchForm onQueryChange={handleSearchQueryChange} query={query} />
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
                itemsPerPage={limit}
                onLimitChange={handleLimitChange}
                onPageChange={handlePageChange}
                totalResults={totalResults}
              />
            )}
            {isLoading ? <Spinner /> : <CharacterList characters={apiResponse?.characters} />}
          </section>
          <Outlet />
        </>
      </MainLayout>
    </>
  );
}
