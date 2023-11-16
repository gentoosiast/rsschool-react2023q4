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

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/no characters found/i);
  });

  it('should render the specified number of character cards', () => {
    renderWithProviders(
      <MemoryRouter>
        <CharacterList characters={charactersMock} />
      </MemoryRouter>,
    );

    const cards = screen.getAllByRole('article');
    expect(cards).toHaveLength(3);
  });
});
