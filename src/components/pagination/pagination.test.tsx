import type { JSX } from 'react';
import { MemoryRouter } from 'react-router-dom';

import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { useParams } from '@/hooks/use-params';

import { Pagination } from './pagination';

const TestPaginationComponent = (): JSX.Element => {
  const { page, setParams } = useParams();

  const handlePageChange = (page: number): void => {
    setParams({ _page: `${page}` });
  };

  return (
    <>
      <h1>page: {page}</h1>
      <Pagination
        currentPage={1}
        itemsPerPage={10}
        onLimitChange={() => {}}
        onPageChange={handlePageChange}
        totalResults={100}
      />
    </>
  );
};

describe('Pagination', () => {
  it('should update URL query parameter when page changes', async () => {
    render(
      <MemoryRouter>
        <TestPaginationComponent />
      </MemoryRouter>,
    );

    const user = userEvent.setup();
    const pageFourButton = screen.getByRole('button', { name: /page 4/i });

    let pageValue = screen.queryByRole('heading', { level: 1, name: /page: 4/i });
    expect(pageValue).not.toBeInTheDocument();

    await user.click(pageFourButton);

    pageValue = screen.getByRole('heading', { level: 1, name: /page: 4/i });

    expect(pageValue).toBeInTheDocument();
  });
});
