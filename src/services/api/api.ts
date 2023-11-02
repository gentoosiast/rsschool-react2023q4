import axios from 'axios';
import { ValiError, flatten, parse } from 'valibot';

import type { ApiResponse, Character } from './types';

import { BASEURL, DEFAULT_ITEMS_PER_PAGE } from './constants';
import { ApiSchema } from './schema';
import { HTTPStatusCode } from './types';

const fetchData = async (url: string): Promise<ApiResponse | null> => {
  try {
    const response = await axios.get(url);
    const headers = response.headers;

    const data: unknown = response.data;

    const characters = parse(ApiSchema, data);
    const totalCountHeader: unknown = headers['x-total-count'];

    const total = Number(totalCountHeader);

    return { characters, total };
  } catch (err) {
    if (err instanceof ValiError) {
      console.error(flatten(err));
    } else if (!(axios.isAxiosError(err) && err.response?.status === HTTPStatusCode.NotFound)) {
      console.error(err);
    }
    return null;
  }
};

export const rickAndMortyApi = {
  async getById(id: number): Promise<Character | null> {
    const data = await fetchData(`${BASEURL}/?id=${id}`);

    if (data) {
      return data.characters[0];
    }

    return null;
  },

  async search(
    query: string,
    page = 1,
    limit = DEFAULT_ITEMS_PER_PAGE,
  ): Promise<ApiResponse | null> {
    const params = new URLSearchParams({
      _limit: `${limit}`,
      _page: `${page}`,
    });

    if (query) {
      params.set('q', query);
    }

    return fetchData(`${BASEURL}?${params.toString()}`);
  },
};
