import { MemoryRouter, RouterProvider, createMemoryRouter } from 'react-router-dom';

import { render, screen, within } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { routes } from '@/router/router';

import { CharacterDetails } from './character-details';

describe('CharacterDetails', () => {
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
    expect(card).toBeInTheDocument();

    const cardHeading = await within(card).findByRole('heading', {
      level: 2,
      name: /adjudicator rick/i,
    });
    expect(cardHeading).toBeInTheDocument();

    const characterStatus = within(card).getByText(/dead/i);
    expect(characterStatus).toBeInTheDocument();

    const characterSpecies = within(card).getByText(/human/i);
    expect(characterSpecies).toBeInTheDocument();

    const characterGender = within(card).getByText(/male/i);
    expect(characterGender).toBeInTheDocument();

    const characterOrigin = within(card).getByText(/unknown/i);
    expect(characterOrigin).toBeInTheDocument();

    const characterLocation = within(card).getByText(/citadel of ricks/i);
    expect(characterLocation).toBeInTheDocument();
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
