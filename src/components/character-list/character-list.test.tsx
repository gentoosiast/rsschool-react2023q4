import { render, screen } from '@testing-library/react';
import { afterAll, afterEach, describe, expect, it, vi } from 'vitest';

import { charactersMock } from '@/tests/mocks';

import { CharacterList } from './character-list';

vi.mock('next/router', () => vi.importActual('next-router-mock'));

describe('CharacterList', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  it('should display an appropriate message if no cards are present', () => {
    render(<CharacterList characters={[]} />);

    const noResultsHeading = screen.getByRole('heading', {
      level: 1,
      name: /no characters found/i,
    });

    expect(noResultsHeading).toBeInTheDocument();
  });

  it('should render the specified number of character cards', () => {
    render(<CharacterList characters={charactersMock.slice(0, 3)} />);

    const cards = screen.getAllByRole('article');
    expect(cards).toHaveLength(3);
  });
});
