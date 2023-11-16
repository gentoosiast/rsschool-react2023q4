import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { ApiResponse, Character, Characters } from './types';

import { setAreCharactersLoading } from '../../store/slices/settings-slice';
import { BASEURL, DEFAULT_ITEMS_PER_PAGE } from './constants';

type SearchQueryArg = {
  limit: number;
  name: string;
  page: number;
};

export const rickAndMortyApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: BASEURL }),
  endpoints: (builder) => ({
    getById: builder.query<Character, number>({
      query: (id) => `/${id}`,
    }),

    search: builder.query<ApiResponse, SearchQueryArg>({
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        dispatch(setAreCharactersLoading(true));
        try {
          await queryFulfilled;
        } finally {
          dispatch(setAreCharactersLoading(false));
        }
      },
      query: ({ limit = DEFAULT_ITEMS_PER_PAGE, name, page = 1 }) => {
        const params = new URLSearchParams({
          _limit: `${limit}`,
          _page: `${page}`,
        });

        if (name) {
          params.set('q', name);
        }

        return `?${params.toString()}`;
      },
      transformResponse: (response: Characters, meta) => {
        const total =
          meta && meta.response ? Number(meta.response.headers.get('x-total-count')) : 0;

        return { characters: response, total };
      },
    }),
  }),
  reducerPath: 'rickAndMortyApi',
});

export const { useGetByIdQuery, useSearchQuery } = rickAndMortyApi;
