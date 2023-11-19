import { MemoryRouter } from 'react-router-dom';

import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { charactersMock } from '@/tests/mocks';
import { renderWithProviders } from '@/tests/render-with-providers';

import { CharacterList } from './character-list';

describe('CharacterList', () => {
  it('should display an appropriate message if no cards are present', () => {
    renderWithProviders(
      <MemoryRouter>
        <CharacterList characters={[]} />,
      </MemoryRouter>,
    );

    const noResultsHeading = screen.getByRole('heading', {
      level: 1,
      name: /no characters found/i,
    });

    expect(noResultsHeading).toBeInTheDocument();
  });

  it('should render the specified number of character cards', () => {
    renderWithProviders(
      <MemoryRouter>
        <CharacterList characters={charactersMock.slice(0, 3)} />
      </MemoryRouter>,
    );

    const cards = screen.getAllByRole('article');
    expect(cards).toHaveLength(3);
  });
});
