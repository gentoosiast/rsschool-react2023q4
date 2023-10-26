import { Component } from 'react';
import type { ReactNode } from 'react';

import type { Character } from '@/services/api';

import { Card } from '@/components/card';

import styles from './card-list.module.css';

type Props = {
  characters: Character[];
};

export class CardList extends Component<Props> {
  render(): ReactNode {
    return this.props.characters.length > 0 ? (
      <section className={styles.cards}>
        {this.props.characters.map((character) => (
          <Card character={character} key={character.id} />
        ))}
      </section>
    ) : (
      <div className={styles.noResults}>
        <img alt="Rick and Morty crying" height="720" src="/rick-morty-sad.jpg" width="821" />
        <h1>No characters found</h1>
      </div>
    );
  }
}
