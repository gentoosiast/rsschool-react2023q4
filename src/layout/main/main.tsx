import { Component } from 'react';
import type { ReactNode } from 'react';

import type { Character } from '@/services/api';

import { CardList } from '@/components/card-list';

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
