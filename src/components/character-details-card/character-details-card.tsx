import type { JSX } from 'react';

import type { Character } from '@/services/api';

import styles from './character-details-card.module.css';

type Props = {
  character: Character | null;
};

export function CharacterDetailsCard({ character }: Props): JSX.Element {
  if (!character) {
    return <h1>No character found</h1>;
  }

  const { gender, image, location, name, origin, species, status } = character;

  return (
    <article className={styles.card}>
      <img alt={name} height="300" src={image} width="300" />
      <h2 className={styles.cardHeading}>{name}</h2>
      <div className={styles.cardInfo}>
        <p>
          <span>Status:</span> {status}
        </p>
        <p>
          <span>Species:</span> {species}
        </p>
        <p>
          <span>Gender:</span> {gender}
        </p>
        <p>
          <span>Origin:</span> {origin}
        </p>
        <p>
          <span>Location:</span> {location}
        </p>
      </div>
    </article>
  );
}