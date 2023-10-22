import type { Output } from 'valibot';

import axios from 'axios';
import { array, nullable, number, object, parse, string } from 'valibot';

const baseURL = 'https://rickandmortyapi.com/api/character';

const CharacterSchema = object({
  created: string(),
  episode: array(string()),
  gender: string(),
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
  status: string(),
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

export const api = {
  async getAll(): Promise<ApiResponse | null> {
    try {
      const response = await axios.get(baseURL);

      const data: unknown = response.data;

      return parse(ApiSchema, data);
    } catch (err) {
      return null;
    }
  },

  async getOne(query: string, page = 1): Promise<ApiResponse | null> {
    try {
      const response = await axios.get(`${baseURL}?name=${query}&page=${page}`);

      const data: unknown = response.data;

      return parse(ApiSchema, data);
    } catch (err) {
      return null;
    }
  },
};
