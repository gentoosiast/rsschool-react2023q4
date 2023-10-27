import axios from 'axios';
import { ValiError, flatten, parse } from 'valibot';

import type { ApiResponse } from './types';

import { baseURL } from './constants';
import { ApiSchema } from './schema';

const fetchData = async (url: string): Promise<ApiResponse | null> => {
  try {
    const response = await axios.get(url);

    const data: unknown = response.data;

    return parse(ApiSchema, data);
  } catch (err) {
    if (err instanceof ValiError) {
      console.error(flatten(err));
    } else {
      console.error(err);
    }
    return null;
  }
};

export const api = {
  async getAll(): Promise<ApiResponse | null> {
    return fetchData(baseURL);
  },

  async getOne(query: string, page = 1): Promise<ApiResponse | null> {
    const params = new URLSearchParams({
      name: query,
      page: page.toString(),
    });

    return fetchData(`${baseURL}?${params.toString()}`);
  },
};
