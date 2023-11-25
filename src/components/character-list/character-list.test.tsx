import { screen } from '@testing-library/react';
import mockRouter from 'next-router-mock';
import { afterAll, afterEach, describe, expect, it, vi } from 'vitest';

import HomePage from '@/pages/index';
import { renderWithProviders } from '@/tests/render-with-providers';

vi.mock('next/router', () => vi.importActual('next-router-mock'));

describe('CharacterList', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  it('should display an appropriate message if no cards are present', async () => {
    mockRouter.push('/?q=nothingwillbefound');
    renderWithProviders(<HomePage />);

    const noResultsHeading = await screen.findByRole('heading', {
      level: 1,
      name: /no characters found/i,
    });

    expect(noResultsHeading).toBeInTheDocument();
  });

  it('should render the specified number of character cards', async () => {
    mockRouter.push('/?q=princess');

    renderWithProviders(<HomePage />);

    const cards = await screen.findAllByRole('article');
    expect(cards).toHaveLength(2);
  });
});
