import { useCallback, useState } from 'react';
import type { JSX } from 'react';

import type { ApiResponse } from '@/services/api';

import { CardList } from '@/components/card-list';
import { ExceptionButton } from '@/components/exception-button';
import { SearchForm } from '@/components/search-form';
import { Spinner } from '@/components/spinner';
import { HeaderLayout } from '@/layout/header-layout';
import { MainLayout } from '@/layout/main-layout';
import { rickAndMortyApi } from '@/services/api';

export function HomePage(): JSX.Element {
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCards = async (query: string): Promise<void> => {
    const response = await rickAndMortyApi.search(query);
    setApiResponse(response);
    setIsLoading(false);
  };

  const handleSearchQueryChange = useCallback((query: string): void => {
    setIsLoading(true);
    void fetchCards(query);
  }, []);

  return (
    <>
      <HeaderLayout>
        <>
          <SearchForm onSubmit={handleSearchQueryChange} />
          <ExceptionButton />
        </>
      </HeaderLayout>
      <MainLayout>
        <>{isLoading ? <Spinner /> : <CardList characters={apiResponse ?? []} />}</>
      </MainLayout>
    </>
  );
}
