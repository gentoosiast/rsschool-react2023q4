import type { Output } from 'valibot';

import axios from 'axios';
import {
  ValiError,
  array,
  enumType,
  flatten,
  nullable,
  number,
  object,
  parse,
  string,
} from 'valibot';

const baseURL = 'https://rickandmortyapi.com/api/character';

const CharacterSchema = object({
  created: string(),
  episode: array(string()),
  gender: enumType(['Female', 'Male', 'Genderless', 'unknown']),
  id: number(),
  image: string(),
  location: object({
    name: string(),
    url: string(),
  }),
  name: string(),
  origin: object({
    name: string(),
    url: string(),
  }),
  species: string(),
  status: enumType(['Alive', 'Dead', 'unknown']),
  type: string(),
  url: string(),
});

const ApiSchema = object({
  info: object({
    count: number(),
    next: nullable(string()),
    pages: number(),
    prev: nullable(string()),
  }),
  results: array(CharacterSchema),
});

export type ApiResponse = Output<typeof ApiSchema>;

export type Character = Output<typeof CharacterSchema>;

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
