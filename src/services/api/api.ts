import type { BaseSchema } from 'valibot';

import axios, { AxiosResponseHeaders, RawAxiosResponseHeaders } from 'axios';
import { Output, ValiError, flatten, parse } from 'valibot';

import type { ApiResponse, Character } from './types';

import { BASEURL, DEFAULT_ITEMS_PER_PAGE, IMAGE_CDN_URL } from './constants';
import { ApiSchema, CharacterSchema } from './schema';
import { HTTPStatusCode } from './types';

const fetchData = async <T extends BaseSchema>(
  url: string,
  schema: T,
): Promise<{
  data: Output<T>;
  headers: AxiosResponseHeaders | RawAxiosResponseHeaders;
} | null> => {
  try {
    const response = await axios.get(url);
    const headers = response.headers;

    const unknownData: unknown = response.data;

    const data = parse(schema, unknownData);

    return { data, headers };
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
    const result = await fetchData(`${BASEURL}/${id}`, CharacterSchema);

    return result && result.data;
  },

  getImage(id: number): string {
    return `${IMAGE_CDN_URL}/${id}.jpeg`;
  },

  async search(query: string, page = 1, limit = DEFAULT_ITEMS_PER_PAGE): Promise<ApiResponse> {
    const params = new URLSearchParams({
      _limit: `${limit}`,
      _page: `${page}`,
    });

    if (query) {
      params.set('q', query);
    }

    const result = await fetchData(`${BASEURL}?${params.toString()}`, ApiSchema);

    if (result) {
      const totalCountHeader: unknown = result.headers['x-total-count'] ?? '1';

      const total = Number(totalCountHeader);

      return { characters: result.data, total };
    }

    return { characters: [], total: 0 };
  },
};
