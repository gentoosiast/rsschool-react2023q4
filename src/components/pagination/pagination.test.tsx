import { screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import mockRouter from 'next-router-mock';
import { afterAll, afterEach, describe, expect, it, vi } from 'vitest';

import HomePage from '@/pages/index';
import { renderWithProviders } from '@/tests/render-with-providers';

vi.mock('next/router', () => vi.importActual('next-router-mock'));

describe('Pagination', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  it('should reset page to 1 and set new items per page value after items per page has been changed', async () => {
    mockRouter.push('/?_page=3&_limit=10');

    renderWithProviders(<HomePage />);

    expect(mockRouter).toMatchObject({ query: { _limit: '10', _page: '3' } });

    const selectForItemsPerPage = await screen.findByRole('combobox');

    const user = userEvent.setup();
    await user.selectOptions(selectForItemsPerPage, '5');

    expect(mockRouter).toMatchObject({ query: { _limit: '5', _page: '1' } });
  });

  it('should set current page correctly if page value was provided in URL', async () => {
    mockRouter.push('/?_page=3');

    renderWithProviders(<HomePage />);

    const currentPageButton = await screen.findByRole('button', {
      current: true,
    });

    expect(currentPageButton).toHaveTextContent('3');
    expect(currentPageButton).toBeDisabled();
  });

  it('should set items per page value in select if items per page value was provided in URL', async () => {
    mockRouter.push('/?_limit=5');

    renderWithProviders(<HomePage />);

    const selectForItemsPerPage = await screen.findByRole('combobox');

    expect(mockRouter).toMatchObject({ query: { _limit: '5' } });
    expect(selectForItemsPerPage).toHaveValue('5');
  });

  it('should allow user to move between pages', async () => {
    mockRouter.push('/?_page=1');

    renderWithProviders(<HomePage />);

    expect(mockRouter).toMatchObject({ query: { _page: '1' } });

    const prevPageButton = await screen.findByLabelText(/go to the previous page/i);
    const nextPageButton = screen.getByLabelText(/go to the next page/i);
    const firstPageButton = screen.getByLabelText(/go to the first page/i);
    const lastPageButton = screen.getAllByLabelText(/go to the last page/i)[0];

    const user = userEvent.setup();
    await user.click(nextPageButton);
    expect(mockRouter).toMatchObject({ query: { _page: '2' } });

    await user.click(lastPageButton);
    expect(mockRouter).toMatchObject({ query: { _page: '78' } });

    await user.click(prevPageButton);
    expect(mockRouter).toMatchObject({ query: { _page: '77' } });

    await user.click(firstPageButton);
    expect(mockRouter).toMatchObject({ query: { _page: '1' } });
  });
});
