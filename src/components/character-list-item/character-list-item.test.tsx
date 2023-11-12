import { MemoryRouter, RouterProvider, createMemoryRouter } from 'react-router-dom';

import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import axios from 'axios';
import { setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from 'vitest';

import { AppProvider } from '@/providers/app-provider';
import { routes } from '@/router/router';
import { apiResponseMock, characterMock } from '@/tests/mocks';
import { handlers } from '@/tests/msw/handlers';

import { CharacterDetails } from '../character-details';
import { CharacterListItem } from './character-list-item';

const server = setupServer(...handlers);

describe('CharacterListItem', () => {
  beforeAll(() => {
    server.listen({ onUnhandledRequest: 'error' });
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
        <CharacterListItem character={characterMock} />,
      </MemoryRouter>,
    );

    expect(
      screen.getByRole('heading', { level: 2, name: /adjudicator rick/i }),
    ).toBeInTheDocument();
  });

  it('should trigger an additional API call to fetch detailed information after user clicks on the card', async () => {
    const spy = vi.spyOn(axios, 'get');

    render(
      <MemoryRouter initialEntries={['/']}>
        <CharacterListItem character={characterMock} />
        <CharacterDetails />
      </MemoryRouter>,
    );

    const user = userEvent.setup();
    const card = screen.getByRole('heading', { level: 2, name: /adjudicator rick/i });

    await user.click(card);

    expect(spy).toHaveBeenCalledWith(
      'https://rickandmortyapi-sigma.vercel.app/api/character/8',
      expect.anything(),
    );
  });

  it('should open a detailed card component upon user click on the card', async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ['/?q=Rick&_page=1&_limit=10'],
    });

    render(
      <AppProvider
        initialState={{ apiResponse: apiResponseMock, isLoading: false, searchQuery: 'Rick' }}
      >
        <RouterProvider router={router} />
      </AppProvider>,
    );

    const card = await screen.findByRole('heading', { level: 2, name: /adjudicator rick/i });
    expect(card).toBeInTheDocument();

    const user = userEvent.setup();
    await user.click(card);

    const detailedCard = await screen.findByTestId('details-card');
    expect(detailedCard).toBeInTheDocument();
  });
});
