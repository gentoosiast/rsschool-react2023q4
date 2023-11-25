import { render, screen, within } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import mockRouter from 'next-router-mock';
import { afterAll, afterEach, describe, expect, it, vi } from 'vitest';

import HomePage from '@/pages/index';
import { characterMock } from '@/tests/mocks';
import { renderWithProviders } from '@/tests/render-with-providers';

import { CharacterDetailsCard } from './character-details-card';

vi.mock('next/router', () => vi.importActual('next-router-mock'));

describe('CharacterDetailsCard', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  it('should display detailed info about the character', () => {
    render(<CharacterDetailsCard character={characterMock} onClose={() => {}} />);

    const card = screen.getByTestId('details-card');
    expect(card).toBeInTheDocument();

    const cardHeading = within(card).getByRole('heading', {
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

  it('should be closed when the user clicks on the close button', async () => {
    mockRouter.push('/?details=8');

    renderWithProviders(<HomePage />);

    let detailsCard: HTMLElement | null = await screen.findByTestId('details-card');
    expect(detailsCard).toBeInTheDocument();

    const closeDetailsCardButton = within(detailsCard).getByRole('button', {
      name: /close/i,
    });
    const user = userEvent.setup();
    await user.click(closeDetailsCardButton);

    detailsCard = screen.queryByTestId('details-card');
    expect(detailsCard).not.toBeInTheDocument();
  });
});
