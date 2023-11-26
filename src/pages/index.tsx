import type { MouseEvent } from 'react';

import { skipToken } from '@reduxjs/toolkit/dist/query';
import { useRouter } from 'next/router';

import { CharacterDetailsCard } from '@/components/character-details-card';
import { CharacterList } from '@/components/character-list';
import { ExceptionButton } from '@/components/exception-button';
import { Pagination } from '@/components/pagination';
import { SearchForm } from '@/components/search-form';
import { wrapper } from '@/store';
import { getCharacterById, getRunningQueriesThunk, searchCharacters } from '@/store/api';
import { useGetByIdQuery, useSearchQuery } from '@/store/api';

import { sanitizeAppSearchParams } from '../lib/sanitize-search-params';

import styles from '@/styles/Home.module.css';

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const {
    _limit: limitParam,
    _page: pageParam,
    details: detailsParam,
    q: queryParam,
  } = context.query;
  const { details, limit, page, query } = sanitizeAppSearchParams({
    detailsParam,
    limitParam,
    pageParam,
    queryParam,
  });

  store.dispatch(searchCharacters.initiate({ limit, name: query, page }));

  if (details) {
    store.dispatch(getCharacterById.initiate(details));
  }

  await Promise.all(store.dispatch(getRunningQueriesThunk()));

  return {
    props: {},
  };
});

export default function Home() {
  const router = useRouter();
  const {
    _limit: limitParam,
    _page: pageParam,
    details: detailsParam,
    q: queryParam,
  } = router.query;
  const { details, limit, page, query } = sanitizeAppSearchParams({
    detailsParam,
    limitParam,
    pageParam,
    queryParam,
  });

  const { data: character } = useGetByIdQuery(details ?? skipToken);
  const { data } = useSearchQuery({ limit, name: query, page });

  function handleDetailsClose(event: MouseEvent) {
    const { details, ...rest } = router.query;

    if (details) {
      event.preventDefault();
      router.push({ query: rest });
    }
  }

  function handlePageChange(page: number) {
    router.push({ query: { ...router.query, _page: `${page}` } });
  }

  function handleLimitChange(limit: number) {
    router.push({ query: { ...router.query, _limit: `${limit}`, _page: '1' } });
  }

  function handleQueryChange(newSearchQuery: string) {
    router.push({ query: { ...router.query, _page: '1', q: newSearchQuery } });
  }

  return (
    <>
      <div className={styles.pageContainer}>
        <header className={styles.header}>
          <section className={styles.searchSection}>
            <SearchForm initialSearchValue={query} onQueryChange={handleQueryChange} />
            <ExceptionButton />
          </section>
          {data && (
            <Pagination
              currentPage={page}
              itemsPerPage={limit}
              onLimitChange={handleLimitChange}
              onPageChange={handlePageChange}
              totalResults={data.total}
            />
          )}
        </header>
        <main className={styles.main} onClick={(e) => handleDetailsClose(e)}>
          <section className={styles.cards}>
            {data && <CharacterList characters={data.characters} />}
          </section>
          {details && character && (
            <CharacterDetailsCard character={character} onClose={handleDetailsClose} />
          )}
        </main>
      </div>
    </>
  );
}
