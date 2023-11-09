import type { JSX, ReactNode } from 'react';
import { useReducer } from 'react';

import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';

import type { AppState } from '@/providers/app-provider';

import { AppContext, appReducer } from '@/providers/app-provider';

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
    const appInitialState: AppState = {
      apiResponse: { characters: [], total: 0 },
      isLoading: false,
      searchQuery: '',
    };

    type Props = {
      children: ReactNode;
    };

    const AppProvider = ({ children }: Props): JSX.Element => {
      const [state, dispatch] = useReducer(appReducer, appInitialState);

      return <AppContext.Provider value={{ dispatch, state }}>{children}</AppContext.Provider>;
    };

    render(
      <AppProvider>
        <SearchForm />
      </AppProvider>,
    );

    const searchQuery = 'test12345';
    const user = userEvent.setup();
    const searchInput = screen.getByRole('searchbox');
    const submitButton = screen.getByRole('button');

    await user.type(searchInput, searchQuery);
    await user.click(submitButton);

    expect(setItemSpy).toHaveBeenCalledWith(
      `${LOCALSTORAGE_PREFIX}${LOCALSTORAGE_KEY}`,
      JSON.stringify(searchQuery),
    );
  });
});
