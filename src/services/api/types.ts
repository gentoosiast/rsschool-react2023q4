import type { Output } from 'valibot';

import type { ApiSchema, CharacterSchema } from './schema';

type ApiResponse = Output<typeof ApiSchema>;

type Character = Output<typeof CharacterSchema>;

export const enum HTTPStatusCode {
  NotFound = 404,
}

export type { ApiResponse, Character };
