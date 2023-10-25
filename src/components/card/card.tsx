import { Component } from 'react';
import type { ReactNode } from 'react';

import type { Character } from '@/services/api';

import styles from './card.module.css';

type Props = {
  character: Character;
};

export class Card extends Component<Props> {
  render(): ReactNode {
    const { character } = this.props;

    return (
      <article className={styles.card}>
        <img alt={character.name} height="300" src={character.image} width="300" />
        <h2 className={styles.cardHeading}>{character.name}</h2>
        <div className={styles.cardInfo}>
          <p>
            <span>Episode appearances:</span> {character.episode.length}
          </p>
          <p>
            <span>Status:</span> {character.status}
          </p>
          <p>
            <span>Species:</span> {character.species}
          </p>
          <p>
            <span>Gender:</span> {character.gender}
          </p>
          <p>
            <span>Origin:</span> {character.origin.name}
          </p>
          <p>
            <span>Location:</span> {character.location.name}
          </p>
        </div>
      </article>
    );
  }
}
