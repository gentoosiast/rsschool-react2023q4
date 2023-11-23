import Head from 'next/head';
import { SearchForm } from '@/components/search-form';
import { CharacterList } from '@/components/character-list';
import { wrapper } from '@/store';
import { searchCharacters, getCharacterById, getRunningQueriesThunk } from '@/store/api';
import { useSearchQuery, useGetByIdQuery } from '@/store/api';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { useRouter } from 'next/router';
import { validateNumericParam } from '@/lib/validate-numeric-param';
import { MAX_ITEMS_PER_PAGE, DEFAULT_ITEMS_PER_PAGE } from '@/store/api/constants';
import styles from '@/styles/Home.module.css';

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const {
    _page: pageParam,
    _limit: limitParam,
    q: queryParam,
    details: detailsParam,
  } = context.query;
  const query = typeof queryParam === 'string' ? queryParam : '';
  const page = validateNumericParam(pageParam, 1, Infinity, 1);
  const details = validateNumericParam(detailsParam, 1, Infinity, 0) || null;

  const limit = validateNumericParam(limitParam, 1, MAX_ITEMS_PER_PAGE, DEFAULT_ITEMS_PER_PAGE);

  store.dispatch(searchCharacters.initiate({ name: query, page, limit }));

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
    _page: pageParam,
    _limit: limitParam,
    q: queryParam,
    details: detailsParam,
  } = router.query;
  const query = typeof queryParam === 'string' ? queryParam : '';
  const page = validateNumericParam(pageParam, 1, Infinity, 1);
  const details = validateNumericParam(detailsParam, 1, Infinity, 0) || null;
  const limit = validateNumericParam(limitParam, 1, MAX_ITEMS_PER_PAGE, DEFAULT_ITEMS_PER_PAGE);

  const { data: character } = useGetByIdQuery(details ?? skipToken);
  const { data } = useSearchQuery({ page, limit, name: query });

  return (
    <>
      <Head>
        <title>Rick and Morty in a Next.js world</title>
        <meta name="description" content="RS School React 2023 Q3 Learning Project" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SearchForm />
      <main className={`${styles.main}`}>
        {data && <CharacterList characters={data.characters} />}
        {details && <p>{JSON.stringify(character)}</p>}
      </main>
    </>
  );
}
