import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { setupStore } from '@/store/store';

import { CharacterList } from './character-list';

describe('CharacterList', () => {
  it('should display an appropriate message if no cards are present', () => {
    render(
      <MemoryRouter>
        <Provider store={setupStore()}>
          <CharacterList characters={[]} />
        </Provider>

        {/* <AppProvider
          initialState={{
            apiResponse: { characters: [], total: 0 },
            isLoading: false,
            searchQuery: '',
          }}
        >
        </AppProvider> */}
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/no characters found/i);
  });

  it('should render the specified number of character cards', () => {
    render(
      <MemoryRouter>
        <Provider store={setupStore()}>
          <CharacterList characters={[]} />
        </Provider>

        {/* <AppProvider
          initialState={{ apiResponse: apiResponseMock, isLoading: false, searchQuery: 'Rick' }}
        >
          <CharacterList />
        </AppProvider> */}
      </MemoryRouter>,
    );

    const cards = screen.getAllByRole('article');

    expect(cards).toHaveLength(3);
  });
});
