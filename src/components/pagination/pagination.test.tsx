import type { JSX } from 'react';
import { MemoryRouter } from 'react-router-dom';

import { screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { useAppSearchParams } from '@/hooks/use-app-search-params';
import { renderWithProviders } from '@/tests/render-with-providers';

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
});
