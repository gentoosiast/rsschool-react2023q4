import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { AppProvider } from '@/providers/app-provider';

import { LOCALSTORAGE_KEY, LOCALSTORAGE_PREFIX } from './constants';
import { SearchForm } from './search-form';

describe('SearchForm', () => {
  const getItemSpy = vi.spyOn(Storage.prototype, 'getItem');
  const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');

  afterEach(() => {
    localStorage.clear();
    getItemSpy.mockClear();
    setItemSpy.mockClear();
  });

  it('saves the entered value to the local storage after Search button is clicked', async () => {
    render(
      <AppProvider>
        <SearchForm />
      </AppProvider>,
    );

    const searchQuery = 'test12345';
    const user = userEvent.setup();
    const searchInput = screen.getByPlaceholderText(/search/i);
    const submitButton = screen.getByRole('button', { name: /search/i });

    await user.clear(searchInput);
    await user.type(searchInput, searchQuery);
    await user.click(submitButton);

    expect(setItemSpy).toHaveBeenCalledWith(
      `${LOCALSTORAGE_PREFIX}${LOCALSTORAGE_KEY}`,
      JSON.stringify(searchQuery),
    );
  });

  it('retrieves the value from the local storage upon mounting', () => {
    const savedSearchQuery = 'abracadabra';

    localStorage.setItem(
      `${LOCALSTORAGE_PREFIX}${LOCALSTORAGE_KEY}`,
      JSON.stringify(savedSearchQuery),
    );

    render(
      <AppProvider>
        <SearchForm />
      </AppProvider>,
    );

    const searchInput = screen.getByPlaceholderText(/search/i);

    expect(getItemSpy).toHaveBeenCalledWith(`${LOCALSTORAGE_PREFIX}${LOCALSTORAGE_KEY}`);
    expect(searchInput).toHaveValue(savedSearchQuery);
  });
});
