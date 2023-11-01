import type { Output } from 'valibot';

import type { ApiSchema, CharacterSchema } from './schema';

type Characters = Output<typeof ApiSchema>;

type Character = Output<typeof CharacterSchema>;

type ApiResponse = {
  characters: Characters;
  total: number;
};

export const enum HTTPStatusCode {
  NotFound = 404,
}

export type { ApiResponse, Character };
