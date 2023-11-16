import { MemoryRouter, RouterProvider, createMemoryRouter } from 'react-router-dom';

import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { afterAll, afterEach, describe, expect, it, vi } from 'vitest';

import { routes } from '@/router/router';
import { characterMock } from '@/tests/mocks';

import { CharacterDetails } from '../character-details';
import { CharacterListItem } from './character-list-item';

describe('CharacterListItem', () => {
  afterAll(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
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
    const spy = vi.spyOn(global, 'fetch');

    render(
      <MemoryRouter initialEntries={['/']}>
        <CharacterListItem character={characterMock} />
        <CharacterDetails />
      </MemoryRouter>,
    );

    const card = screen.getByRole('heading', { level: 2, name: /adjudicator rick/i });
    expect(card).toBeInTheDocument();

    const user = userEvent.setup();
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

    render(<RouterProvider router={router} />);

    const card = await screen.findByRole('heading', { level: 2, name: /adjudicator rick/i });
    expect(card).toBeInTheDocument();

    const user = userEvent.setup();
    await user.click(card);

    const detailedCard = await screen.findByTestId('details-card');
    expect(detailedCard).toBeInTheDocument();
  });
});
