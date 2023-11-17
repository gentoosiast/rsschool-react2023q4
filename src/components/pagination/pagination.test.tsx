import type { JSX } from 'react';
import { MemoryRouter, RouterProvider, createMemoryRouter } from 'react-router-dom';

import { screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { useAppSearchParams } from '@/hooks/use-app-search-params';
import { HomePage } from '@/pages/home-page';
import { routes } from '@/router/router';
import { renderWithProviders } from '@/tests/render-with-providers';

import { TestReduxStore } from '../test-redux-store/test-redux-store';
import { Pagination } from './pagination';

const TestPaginationComponent = (): JSX.Element => {
  const { page, setParams } = useAppSearchParams();

  const handlePageChange = (page: number): void => {
    setParams({ _page: `${page}` });
  };

  return (
    <>
      <h1>current page: {page}</h1>
      <Pagination
        currentPage={page}
        onLimitChange={() => {}}
        onPageChange={handlePageChange}
        totalResults={100}
      />
    </>
  );
};

describe('Pagination', () => {
  it('should update URL query parameter when page changes', async () => {
    renderWithProviders(
      <MemoryRouter>
        <TestPaginationComponent />
      </MemoryRouter>,
    );

    const pageFourButton = screen.getByRole('button', { name: /page 4/i });

    const currentPageValue = screen.getByRole('heading', { level: 1, name: /current page: 1/i });
    expect(currentPageValue).toBeInTheDocument();

    const user = userEvent.setup();
    await user.click(pageFourButton);

    const newPageValue = screen.getByRole('heading', { level: 1, name: /current page: 4/i });
    expect(newPageValue).toBeInTheDocument();
  });

  it('should update URL query parameter when limit changes and switch to page to 1', async () => {
    const router = createMemoryRouter(routes, { initialEntries: ['/?_page=4'] });

    renderWithProviders(<RouterProvider router={router} />);

    const searchParams = router.state.location.search;
    expect(searchParams.includes('_limit=5')).toBe(false);
    expect(searchParams.includes('_page=4')).toBe(true);

    const selectForLimit = await screen.findByRole('combobox');

    const user = userEvent.setup();
    await user.selectOptions(selectForLimit, '5');

    const updatedSearchParams = router.state.location.search;
    expect(updatedSearchParams.includes('_limit=5')).toBe(true);
    expect(updatedSearchParams.includes('_page=1')).toBe(true);
  });

  it('should save changed value for items per page to Redux store', async () => {
    renderWithProviders(
      <MemoryRouter>
        <TestReduxStore />
        <HomePage />
      </MemoryRouter>,
    );

    expect(screen.queryByText(/items per page: 5/i)).not.toBeInTheDocument();

    const selectForLimit = await screen.findByRole('combobox');

    const user = userEvent.setup();
    await user.selectOptions(selectForLimit, '5');

    expect(screen.getByText(/items per page: 5/i)).toBeInTheDocument();
  });
});
