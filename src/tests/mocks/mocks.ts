import type { ApiResponse, Character } from '@/services/api';

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

export const charactersMock: Character[] = [
  {
    created: '2017-11-04T18:48:46.250Z',
    gender: 'Male',
    id: 1,
    location: 'Citadel of Ricks',
    name: 'Rick Sanchez',
    origin: 'Earth (C-137)',
    species: 'Human',
    status: 'Alive',
    type: '',
  },

  {
    created: '2017-11-04T18:50:21.651Z',
    gender: 'Male',
    id: 2,
    location: 'Citadel of Ricks',
    name: 'Morty Smith',
    origin: 'unknown',
    species: 'Human',
    status: 'Alive',
    type: '',
  },
  {
    created: '2017-11-04T20:03:34.737Z',
    gender: 'Male',
    id: 8,
    location: 'Citadel of Ricks',
    name: 'Adjudicator Rick',
    origin: 'unknown',
    species: 'Human',
    status: 'Dead',
    type: '',
  },
];

export const apiResponseMock: ApiResponse = {
  characters: charactersMock,
  total: 3,
};
