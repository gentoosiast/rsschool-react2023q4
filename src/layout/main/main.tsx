import { Component } from 'react';
import type { ReactNode } from 'react';

import { CardList } from '@/components/card-list';

import type { Character } from '../../lib/api';

type Props = {
  searchResults: Character[];
};

export class Main extends Component<Props> {
  render(): ReactNode {
    return (
      <main>
        <CardList characters={this.props.searchResults} />
      </main>
    );
  }
}
