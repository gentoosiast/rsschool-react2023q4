import { MemoryRouter } from 'react-router-dom';

import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import axios from 'axios';
import { setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from 'vitest';

import { handlers } from '@/services/msw/handlers';
import { characterMock } from '@/services/msw/mocks';

import { CharacterDetails } from '../character-details';
import { CharacterListItem } from './character-list-item';

const server = setupServer(...handlers);

describe('CharacterListItem', () => {
  beforeAll(() => {
    server.listen({ onUnhandledRequest: 'error' });
    vi.mock('axios');
  });

  afterAll(() => {
    server.close();
    vi.clearAllMocks();
  });

  afterEach(() => {
    server.resetHandlers();
    vi.restoreAllMocks();
  });

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

  it('should trigger an additional API call to fetch detailed information after user clicks on the card', async () => {
    const axiosGet = vi.mocked(axios['get']);

    axiosGet.mockResolvedValue({
      data: characterMock,
    });

    render(
      <MemoryRouter initialEntries={['/']}>
        <CharacterListItem character={characterMock} />
        <CharacterDetails />
      </MemoryRouter>,
    );

    const user = userEvent.setup();
    const card = screen.getByRole('heading', { level: 2, name: /adjudicator rick/i });

    await user.click(card);

    expect(axiosGet).toHaveBeenCalledWith(
      'https://rickandmortyapi-sigma.vercel.app/api/character/8',
      expect.anything(),
    );
  });
});
