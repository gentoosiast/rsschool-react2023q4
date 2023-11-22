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

export const princessesMock: Character[] = [
  {
    created: '2017-11-04T19:50:28.250Z',
    gender: 'Female',
    id: 6,
    location: 'Abadango',
    name: 'Abadango Cluster Princess',
    origin: 'Abadango',
    species: 'Alien',
    status: 'Alive',
    type: '',
  },

  {
    created: '2021-10-17T10:35:15.825Z',
    gender: 'Female',
    id: 730,
    location: 'Earth (Replacement Dimension)',
    name: 'Princess Ponietta',
    origin: 'Earth (Replacement Dimension)',
    species: 'Animal',
    status: 'Alive',
    type: 'CHUD',
  },
];

export const charactersMock = parse(ApiSchema, characterData);

export const apiResponseMock: ApiResponse = {
  characters: charactersMock,
  total: charactersMock.length,
};
