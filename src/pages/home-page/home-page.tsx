import { useCallback, useEffect, useState } from 'react';
import type { JSX, MouseEvent } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';

import type { ApiResponse } from '@/services/api';

import { CharacterList } from '@/components/character-list';
import { ExceptionButton } from '@/components/exception-button';
import { Pagination } from '@/components/pagination';
import { SearchForm } from '@/components/search-form';
import { Spinner } from '@/components/spinner';
import { HeaderLayout } from '@/layout/header-layout';
import { MainLayout } from '@/layout/main-layout';
import { rickAndMortyApi } from '@/services/api';

import { usePagination } from './hooks/use-pagination';

import styles from './home-page.module.css';

export function HomePage(): JSX.Element {
  const [apiResponse, setApiResponse] = useState<ApiResponse>({ characters: [], total: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const { details, limit, page, query } = usePagination();
  const [searchParams, setSearchParams] = useSearchParams();

  const fetchCards = async (query: string, page?: number, limit?: number): Promise<void> => {
    setIsLoading(true);
    const response = await rickAndMortyApi.search(query, page, limit);
    setApiResponse(response);
    setIsLoading(false);
  };

  const handleSearchQueryChange = useCallback(
    (query: string): void => {
      if (query) {
        searchParams.set('q', query);
        setSearchParams(searchParams);
      }
    },
    [setSearchParams, searchParams],
  );

  useEffect(() => {
    void fetchCards(query, page, limit);
  }, [page, limit, query]);

  function handleAsideClose(): void {
    if (searchParams.has('details')) {
      searchParams.delete('details');
      setSearchParams(searchParams);
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
    searchParams.set('_limit', `${limit}`);
    setSearchParams(searchParams);
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
            {apiResponse.total > 0 && (
              <Pagination
                currentPage={page}
                itemsPerPage={limit}
                onLimitChange={handleLimitChange}
                totalResults={apiResponse.total}
              />
            )}
            {isLoading ? <Spinner /> : <CharacterList characters={apiResponse.characters} />}
          </section>
          {details > 0 && <Outlet />}
        </>
      </MainLayout>
    </>
  );
}
