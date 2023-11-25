import { screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import mockRouter from 'next-router-mock';
import { afterAll, afterEach, describe, expect, it, vi } from 'vitest';

import HomePage from '@/pages/index';
import { renderWithProviders } from '@/tests/render-with-providers';

vi.mock('next/router', () => vi.importActual('next-router-mock'));

describe('SearchForm', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  it('should reset page to 1 after search', async () => {
    mockRouter.push('/?_page=3');

    renderWithProviders(<HomePage />);

    const searchInput = screen.getByPlaceholderText(/search/i);
    const submitButton = screen.getByRole('button', { name: /search/i });

    expect(mockRouter).toMatchObject({ query: { _page: '3' } });

    const user = userEvent.setup();
    await user.clear(searchInput);
    await user.type(searchInput, 'princess');
    await user.click(submitButton);

    expect(mockRouter).toMatchObject({ query: { _page: '1' } });
  });

  it('should set search input value if search query was provided in URL', () => {
    mockRouter.push('/?q=princess');

    renderWithProviders(<HomePage />);

    const searchInput = screen.getByPlaceholderText(/search/i);

    expect(searchInput).toHaveValue('princess');
  });

  it('should display no results message if no results were found', async () => {
    renderWithProviders(<HomePage />);

    const searchInput = screen.getByPlaceholderText(/search/i);
    const submitButton = screen.getByRole('button', { name: /search/i });

    let notFoundHeading = screen.queryByRole('heading', {
      level: 1,
      name: /no characters found/i,
    });
    expect(notFoundHeading).not.toBeInTheDocument();

    const user = userEvent.setup();
    await user.clear(searchInput);
    await user.type(searchInput, 'nothingwillbefound');
    await user.click(submitButton);

    notFoundHeading = await screen.findByRole('heading', {
      level: 1,
      name: /no characters found/i,
    });
    expect(notFoundHeading).toBeInTheDocument();
  });
});
