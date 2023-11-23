import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { characterMock } from '@/tests/mocks';

import { CharacterDetailsCard } from './character-details-card';

describe('CharacterDetailsCard', () => {
  it('should display detailed info about the character', () => {
    render(<CharacterDetailsCard character={characterMock} onClose={() => {}} />);

    const card = screen.getByTestId('details-card');
    expect(card).toBeInTheDocument();

    const cardHeading = within(card).getByRole('heading', {
      level: 2,
      name: /adjudicator rick/i,
    });
    expect(cardHeading).toBeInTheDocument();

    const characterStatus = within(card).getByText(/dead/i);
    expect(characterStatus).toBeInTheDocument();

    const characterSpecies = within(card).getByText(/human/i);
    expect(characterSpecies).toBeInTheDocument();

    const characterGender = within(card).getByText(/male/i);
    expect(characterGender).toBeInTheDocument();

    const characterOrigin = within(card).getByText(/unknown/i);
    expect(characterOrigin).toBeInTheDocument();

    const characterLocation = within(card).getByText(/citadel of ricks/i);
    expect(characterLocation).toBeInTheDocument();
  });
});
