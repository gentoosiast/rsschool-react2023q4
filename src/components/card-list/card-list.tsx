import { Component } from 'react';
import type { ReactNode } from 'react';

import type { Character } from '@/lib/api';

import { Card } from '@/components/card';

type Props = {
  characters: Character[];
};

export class CardList extends Component<Props> {
  render(): ReactNode {
    return this.props.characters.map((character) => (
      <Card key={character.id} name={character.name} />
    ));
  }
}
