import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import { afterAll, afterEach, describe, expect, it, vi } from 'vitest';

import HomePage from '@/pages/index';
import { characterMock } from '@/tests/mocks';
import { renderWithProviders } from '@/tests/render-with-providers';

import { CharacterListItem } from './character-list-item';

vi.mock('next/router', () => vi.importActual('next-router-mock'));

describe('CharacterListItem', () => {
  afterAll(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render the relevant card data', () => {
    render(<CharacterListItem character={characterMock} />);

    expect(
      screen.getByRole('heading', { level: 2, name: /adjudicator rick/i }),
    ).toBeInTheDocument();
  });

  it('should open a detailed card component upon user click on the card', async () => {
    renderWithProviders(
      <MemoryRouterProvider>
        <HomePage />
      </MemoryRouterProvider>,
    );

    let detailedCard = screen.queryByTestId('details-card');
    expect(detailedCard).not.toBeInTheDocument();

    const card = await screen.findByRole('heading', { level: 2, name: /adjudicator rick/i });
    const user = userEvent.setup();
    await user.click(card);

    detailedCard = await screen.findByTestId('details-card');
    expect(detailedCard).toBeInTheDocument();
  });
});
