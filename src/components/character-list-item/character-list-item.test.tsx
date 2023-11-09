import { MemoryRouter } from 'react-router-dom';

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { CharacterListItem } from './character-list-item';

describe('CharacterListItem', () => {
  it('should render the relevant card data', () => {
    render(
      <MemoryRouter>
        <CharacterListItem
          character={{
            created: '2017-11-04T18:48:46.250Z',
            gender: 'Male',
            id: 1,
            location: 'Citadel of Ricks',
            name: 'Rick Sanchez',
            origin: 'Earth (C-137)',
            species: 'Human',
            status: 'Alive',
            type: '',
          }}
        />
        ,
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { level: 2, name: /rick sanchez/i })).toBeInTheDocument();
  });
});
