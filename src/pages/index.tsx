import { skipToken } from '@reduxjs/toolkit/dist/query';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { CharacterDetailsCard } from '@/components/character-details-card';
import { CharacterList } from '@/components/character-list';
import { Pagination } from '@/components/pagination';
import { SearchForm } from '@/components/search-form';
import { validateNumericParam } from '@/lib/validate-numeric-param';
import { wrapper } from '@/store';
import { getCharacterById, getRunningQueriesThunk, searchCharacters } from '@/store/api';
import { useGetByIdQuery, useSearchQuery } from '@/store/api';
import { DEFAULT_ITEMS_PER_PAGE, MAX_ITEMS_PER_PAGE } from '@/store/api/constants';

import styles from '@/styles/Home.module.css';

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const {
    _limit: limitParam,
    _page: pageParam,
    details: detailsParam,
    q: queryParam,
  } = context.query;
  const query = typeof queryParam === 'string' ? queryParam : '';
  const page = validateNumericParam(pageParam, 1, Infinity, 1);
  const details = validateNumericParam(detailsParam, 1, Infinity, 0) || null;

  const limit = validateNumericParam(limitParam, 1, MAX_ITEMS_PER_PAGE, DEFAULT_ITEMS_PER_PAGE);

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
  const query = typeof queryParam === 'string' ? queryParam : '';
  const page = validateNumericParam(pageParam, 1, Infinity, 1);
  const details = validateNumericParam(detailsParam, 1, Infinity, 0) || null;
  const limit = validateNumericParam(limitParam, 1, MAX_ITEMS_PER_PAGE, DEFAULT_ITEMS_PER_PAGE);

  const { data: character } = useGetByIdQuery(details ?? skipToken);
  const { data } = useSearchQuery({ limit, name: query, page });

  function handleDetailsClose() {
    const { details, ...rest } = router.query;
    router.push({ query: rest });
  }

  function handlePageChange(page: number) {
    router.push({ query: { ...router.query, _page: page } });
  }

  function handleLimitChange(limit: number) {
    router.push({ query: { ...router.query, _limit: limit, _page: 1 } });
  }

  return (
    <>
      <Head>
        <title>Rick and Morty in a Next.js world</title>
        <meta content="RS School React 2023 Q3 Learning Project" name="description" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <SearchForm />
      {data && (
        <Pagination
          currentPage={page}
          onLimitChange={handleLimitChange}
          onPageChange={handlePageChange}
          totalResults={data.total}
        />
      )}
      <main className={`${styles.main}`}>
        {data && <CharacterList characters={data.characters} />}
        {details && character && (
          <CharacterDetailsCard character={character} onClose={handleDetailsClose} />
        )}
      </main>
    </>
  );
}
