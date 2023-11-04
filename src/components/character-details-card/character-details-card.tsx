import type { ReactNode } from 'react';

import type { Character } from '@/services/api';

import { rickAndMortyApi } from '@/services/api';

import styles from './character-details-card.module.css';

type Props = {
  character: Character | null;
  onClose: () => void;
};

export function CharacterDetailsCard({ character, onClose }: Props): ReactNode {
  if (!character) {
    return null;
  }

  const { gender, id, location, name, origin, species, status } = character;

  return (
    <article className={styles.card}>
      <img alt={name} height="300" src={rickAndMortyApi.getImage(id)} width="300" />
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
      <button className={styles.closeButton} onClick={() => onClose()} type="button">
        ×
      </button>
    </article>
  );
}
