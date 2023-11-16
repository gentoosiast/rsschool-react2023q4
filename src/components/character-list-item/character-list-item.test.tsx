import { MemoryRouter, RouterProvider, createMemoryRouter } from 'react-router-dom';

import { screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { afterAll, afterEach, describe, expect, it, vi } from 'vitest';

import { routes } from '@/router/router';
import { BASEURL } from '@/services/api';
import { characterMock } from '@/tests/mocks';
import { renderWithProviders } from '@/tests/render-with-providers';

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
    renderWithProviders(
      <MemoryRouter>
        <CharacterListItem character={characterMock} />,
      </MemoryRouter>,
    );

    expect(
      screen.getByRole('heading', { level: 2, name: /adjudicator rick/i }),
    ).toBeInTheDocument();
  });

  it('should trigger an additional API call to fetch detailed information after user clicks on the card', async () => {
    const spy = vi.spyOn(globalThis, 'fetch');

    renderWithProviders(
      <MemoryRouter initialEntries={['/']}>
        <CharacterListItem character={characterMock} />
        <CharacterDetails />
      </MemoryRouter>,
    );

    const card = screen.getByRole('heading', { level: 2, name: /adjudicator rick/i });

    expect(spy).not.toHaveBeenCalled();

    const user = userEvent.setup();
    await user.click(card);

    expect(spy).toHaveBeenCalledWith(expect.objectContaining({ url: `${BASEURL}/8` }));
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should open a detailed card component upon user click on the card', async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ['/?q=Rick&_page=1&_limit=10'],
    });

    renderWithProviders(<RouterProvider router={router} />);

    let detailedCard = screen.queryByTestId('details-card');
    expect(detailedCard).not.toBeInTheDocument();

    const card = await screen.findByRole('heading', { level: 2, name: /adjudicator rick/i });
    const user = userEvent.setup();
    await user.click(card);

    detailedCard = await screen.findByTestId('details-card');
    expect(detailedCard).toBeInTheDocument();
  });
});
