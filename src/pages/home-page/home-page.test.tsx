import { MemoryRouter } from 'react-router-dom';

import { screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { renderWithProviders } from '@/tests/render-with-providers';

import { HomePage } from './home-page';

describe('HomePage', () => {
  it('should display an appropriate message if API returns no cards after search', async () => {
    renderWithProviders(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );

    const searchInput = screen.getByPlaceholderText(/search/i);
    const submitButton = screen.getByRole('button', { name: /search/i });

    const user = userEvent.setup();
    await user.clear(searchInput);
    await user.type(searchInput, 'nothingwillbefound');
    await user.click(submitButton);

    const noResultsHeading = await screen.findByRole('heading', {
      level: 1,
      name: /no characters found/i,
    });

    expect(noResultsHeading).toBeInTheDocument();
  });
});
