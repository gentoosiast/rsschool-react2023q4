import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { parse } from 'valibot';

import type { ApiResponse, Character } from './types';

import { BASEURL, DEFAULT_ITEMS_PER_PAGE } from './constants';
import { ApiSchema, CharacterSchema } from './schema';

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
      transformResponse: (response) => {
        const parsedResponse = parse(CharacterSchema, response);

        return parsedResponse;
      },
    }),

    search: builder.query<ApiResponse, SearchQueryArg>({
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
      transformResponse: (response, meta) => {
        const parsedCharacters = parse(ApiSchema, response);
        const total =
          meta && meta.response ? Number(meta.response.headers.get('x-total-count')) : 0;

        return { characters: parsedCharacters, total };
      },
    }),
  }),
  reducerPath: 'rickAndMortyApi',
});

export const { useGetByIdQuery, useSearchQuery } = rickAndMortyApi;