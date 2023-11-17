import { RouterProvider, createMemoryRouter } from 'react-router-dom';

import { screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { routes } from '@/router/router';
import { renderWithProviders } from '@/tests/render-with-providers';

describe('SearchForm', () => {
  it('should add search query to URL & change page to 1 after new search is made', async () => {
    const router = createMemoryRouter(routes, { initialEntries: ['/?_page=4'] });

    renderWithProviders(<RouterProvider router={router} />);

    const searchParams = router.state.location.search;
    expect(searchParams.includes('_page=4')).toBe(true);
    expect(searchParams.includes('q=alien')).toBe(false);

    const searchInput = screen.getByPlaceholderText(/search/i);
    const submitButton = screen.getByRole('button', { name: /search/i });

    const user = userEvent.setup();
    await user.clear(searchInput);
    await user.type(searchInput, 'alien');
    await user.click(submitButton);

    const updatedSearchParams = router.state.location.search;
    expect(updatedSearchParams.includes('q=alien')).toBe(true);
    expect(updatedSearchParams.includes('_page=1')).toBe(true);
  });
});
