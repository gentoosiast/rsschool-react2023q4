import type { BaseSchema } from 'valibot';

import axios, { AxiosResponseHeaders, CanceledError, RawAxiosResponseHeaders } from 'axios';
import { Output, ValiError, flatten, parse } from 'valibot';

import type { ApiResponse, Character } from './types';

import { BASEURL, DEFAULT_ITEMS_PER_PAGE, IMAGE_CDN_URL } from './constants';
import { ApiSchema, CharacterSchema } from './schema';

const fetchData = async <T extends BaseSchema>(
  url: string,
  schema: T,
  controller: AbortController,
): Promise<{
  data: Output<T>;
  headers: AxiosResponseHeaders | RawAxiosResponseHeaders;
} | null> => {
  try {
    const response = await axios.get(url, { signal: controller.signal });
    const headers = response.headers;

    const unknownData: unknown = response.data;

    const data = parse(schema, unknownData);

    return { data, headers };
  } catch (err) {
    if (err instanceof ValiError) {
      console.error(flatten(err));
    } else if (!(err instanceof CanceledError)) {
      console.error(err);
    }
    return null;
  }
};

export const rickAndMortyApi = {
  async getById(controller: AbortController, id: number): Promise<Character | null> {
    const result = await fetchData(`${BASEURL}/${id}`, CharacterSchema, controller);

    return result && result.data;
  },

  getImage(id: number): string {
    if (id < 1) {
      return '';
    }

    return `${IMAGE_CDN_URL}/${id}.jpeg`;
  },

  async search(
    controller: AbortController,
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

    const result = await fetchData(`${BASEURL}?${params.toString()}`, ApiSchema, controller);

    if (result) {
      const totalCountHeader: unknown = result.headers['x-total-count'];

      let total = 0;

      if (typeof totalCountHeader === 'string') {
        const parsedHeader = parseInt(totalCountHeader, 10);

        if (!Number.isNaN(parsedHeader)) {
          total = parsedHeader;
        }
      }

      return { characters: result.data, total };
    }

    return null;
  },
};
