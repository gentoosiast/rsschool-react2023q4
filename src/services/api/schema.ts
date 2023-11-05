import { array, enumType, nullable, number, object, string } from 'valibot';

export const CharacterSchema = object({
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

export const ApiSchema = object({
  info: object({
    count: number(),
    next: nullable(string()),
    pages: number(),
    prev: nullable(string()),
  }),
  results: array(CharacterSchema),
});
