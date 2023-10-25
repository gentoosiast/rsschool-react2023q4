import { Component } from 'react';
import type { ReactNode } from 'react';

import type { Character } from '@/lib/api';

import { Card } from '@/components/card';

import styles from './card-list.module.css';

type Props = {
  characters: Character[];
};

export class CardList extends Component<Props> {
  render(): ReactNode {
    return (
      <section className={styles.cards}>
        {this.props.characters.map((character) => (
          <Card character={character} key={character.id} />
        ))}
      </section>
    );
  }
}
