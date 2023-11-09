import { useReducer } from 'react';
import type { ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import type { AppState } from '@/providers/app-provider';

import { AppContext, appReducer } from '@/providers/app-provider';

import { CharacterList } from './character-list';

describe('CharacterList', () => {
  it('should display an appropriate message if no cards are present', () => {
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
        <CharacterList />
      </AppProvider>,
    );

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/no characters found/i);
  });

  it('should render the specified number of character cards', () => {
    const appInitialState: AppState = {
      apiResponse: {
        characters: [
          {
            created: '2017-11-04T18:48:46.250Z',
            gender: 'Male',
            id: 1,
            location: 'Citadel of Ricks',
            name: 'Rick Sanchez',
            origin: 'Earth (C-137)',
            species: 'Human',
            status: 'Alive',
            type: '',
          },

          {
            created: '2017-11-04T18:50:21.651Z',
            gender: 'Male',
            id: 2,
            location: 'Citadel of Ricks',
            name: 'Morty Smith',
            origin: 'unknown',
            species: 'Human',
            status: 'Alive',
            type: '',
          },
          {
            created: '2017-11-04T20:03:34.737Z',
            gender: 'Male',
            id: 8,
            location: 'Citadel of Ricks',
            name: 'Adjudicator Rick',
            origin: 'unknown',
            species: 'Human',
            status: 'Dead',
            type: '',
          },
        ],
        total: 3,
      },
      isLoading: false,
      searchQuery: 'Rick',
    };

    type Props = {
      children: ReactNode;
    };

    const AppProvider = ({ children }: Props): JSX.Element => {
      const [state, dispatch] = useReducer(appReducer, appInitialState);

      return <AppContext.Provider value={{ dispatch, state }}>{children}</AppContext.Provider>;
    };

    render(
      <MemoryRouter>
        <AppProvider>
          <CharacterList />
        </AppProvider>
      </MemoryRouter>,
    );

    const cards = screen.queryAllByRole('article');

    expect(cards.length).toBe(3);
  });
});
