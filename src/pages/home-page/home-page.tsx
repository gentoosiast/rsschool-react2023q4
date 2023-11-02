import { useCallback, useEffect, useState } from 'react';
import type { JSX } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';

import type { ApiResponse } from '@/services/api';

import { CharacterList } from '@/components/character-list';
import { ExceptionButton } from '@/components/exception-button';
import { Pagination } from '@/components/pagination';
import { SearchForm } from '@/components/search-form';
import { Spinner } from '@/components/spinner';
import { HeaderLayout } from '@/layout/header-layout';
import { MainLayout } from '@/layout/main-layout';
import { deleteSearchParam } from '@/lib/search-params';
import { rickAndMortyApi } from '@/services/api';

import { usePagination } from './hooks/use-pagination';

import styles from './home-page.module.css';

export function HomePage(): JSX.Element {
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { details, limit, page, query } = usePagination();
  const [searchParams, setSearchParams] = useSearchParams();

  const fetchCards = async (query: string, page?: number, limit?: number): Promise<void> => {
    setIsLoading(true);
    const response = await rickAndMortyApi.search(query, page, limit);
    setApiResponse(response);
    setIsLoading(false);
  };

  const handleSearchQueryChange = useCallback((query: string): void => {
    // setIsLoading(true);
    // void fetchCards(query);
    console.log(query);
  }, []);

  useEffect(() => {
    void fetchCards(query, page, limit);
  }, [page, limit, query]);

  function handleAsideClose(): void {
    if (searchParams.has('details')) {
      setSearchParams(deleteSearchParam(searchParams, 'details'));
    }
  }

  function handleKeyPress(key: string): void {
    if (key === 'Escape') {
      handleAsideClose();
    }
  }

  return (
    <>
      <HeaderLayout>
        <>
          <SearchForm onSubmit={handleSearchQueryChange} />
          <ExceptionButton />
        </>
      </HeaderLayout>
      <MainLayout>
        <>
          <section
            className={styles.mainContent}
            onClick={handleAsideClose}
            onKeyDown={(e) => handleKeyPress(e.key)}
            role="button"
            tabIndex={0}
          >
            {apiResponse && (
              <Pagination
                currentPage={page}
                itemsPerPage={limit}
                totalResults={apiResponse.total}
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
