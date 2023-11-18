import { parse } from 'valibot';

import type { ApiResponse, Character } from '@/store/api';

import { ApiSchema } from '@/store/api';

import characterData from './characters.json';

export const characterMock: Character = {
  created: '2017-11-04T20:03:34.737Z',
  gender: 'Male',
  id: 8,
  location: 'Citadel of Ricks',
  name: 'Adjudicator Rick',
  origin: 'unknown',
  species: 'Human',
  status: 'Dead',
  type: '',
};

export const charactersMock = parse(ApiSchema, characterData);

export const apiResponseMock: ApiResponse = {
  characters: charactersMock,
  total: charactersMock.length,
};
