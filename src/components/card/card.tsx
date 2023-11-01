import type { JSX } from 'react';

import type { Character } from '@/services/api';

import styles from './card.module.css';

type Props = {
  character: Character;
};

export function Card({ character }: Props): JSX.Element {
  return (
    <article className={styles.card}>
      <img alt={character.name} height="300" src={character.image} width="300" />
      <h2 className={styles.cardHeading}>{character.name}</h2>
      <div className={styles.cardInfo}>
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
          <span>Origin:</span> {character.origin}
        </p>
        <p>
          <span>Location:</span> {character.location}
        </p>
      </div>
    </article>
  );
}
