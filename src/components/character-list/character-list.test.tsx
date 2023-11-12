import { MemoryRouter } from 'react-router-dom';

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { AppProvider } from '@/providers/app-provider';
import { apiResponseMock } from '@/tests/mocks';

import { CharacterList } from './character-list';

describe('CharacterList', () => {
  it('should display an appropriate message if no cards are present', () => {
    render(
      <MemoryRouter>
        <AppProvider
          initialState={{
            apiResponse: { characters: [], total: 0 },
            isLoading: false,
            searchQuery: '',
          }}
        >
          <CharacterList />
        </AppProvider>
        ,
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/no characters found/i);
  });

  it('should render the specified number of character cards', () => {
    render(
      <MemoryRouter>
        <AppProvider
          initialState={{ apiResponse: apiResponseMock, isLoading: false, searchQuery: 'Rick' }}
        >
          <CharacterList />
        </AppProvider>
      </MemoryRouter>,
    );

    const cards = screen.getAllByRole('article');

    expect(cards.length).toBe(3);
  });
});
