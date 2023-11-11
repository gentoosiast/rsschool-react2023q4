import { MemoryRouter, RouterProvider, createMemoryRouter } from 'react-router-dom';

import { render, screen, within } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';

import { routes } from '@/router/router';
import { handlers } from '@/services/msw/handlers';

import { CharacterDetails } from './character-details';

const server = setupServer(...handlers);

describe('CharacterDetails', () => {
  beforeAll(() => {
    server.listen({ onUnhandledRequest: 'error' });
  });

  afterAll(() => {
    server.close();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  it('should display a loading indicator while fetching data', () => {
    render(
      <MemoryRouter initialEntries={['/?details=8']}>
        <CharacterDetails />
      </MemoryRouter>,
    );

    const cardHeading = screen.getByRole('heading', { level: 2, name: /loading…/i });

    expect(cardHeading).toBeInTheDocument();
  });

  it('should correctly display the detailed card data', async () => {
    render(
      <MemoryRouter initialEntries={['/?details=8']}>
        <CharacterDetails />
      </MemoryRouter>,
    );

    const card = screen.getByTestId('details-card');

    const cardHeading = await within(card).findByRole('heading', {
      level: 2,
      name: /adjudicator rick/i,
    });

    expect(cardHeading).toBeInTheDocument();
  });

  it('should close the card when the user clicks on the close button', async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ['/?q=Rick&_page=1&_limit=10&details=8'],
    });

    render(<RouterProvider router={router} />);

    const detailsCard = await screen.findByTestId('details-card');
    expect(detailsCard).toBeInTheDocument();

    const closeButton = within(detailsCard).getByRole('button', { name: /×/i });

    expect(closeButton).toBeInTheDocument();

    const user = userEvent.setup();

    await user.click(closeButton);

    expect(detailsCard).not.toBeInTheDocument();
  });
});
