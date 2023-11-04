import type { ReactNode } from 'react';

import cn from 'classnames';

import type { Character } from '@/services/api';

import { rickAndMortyApi } from '@/services/api';

import styles from './character-details-card.module.css';

type Props = {
  character: Character | null;
  isLoading: boolean;
  onClose: () => void;
};

export function CharacterDetailsCard({ character, isLoading, onClose }: Props): ReactNode {
  const LOADING_TEXT = 'Loading…';

  if (!isLoading && !character) {
    return null;
  }

  const {
    gender = LOADING_TEXT,
    id = 0,
    location = LOADING_TEXT,
    name = LOADING_TEXT,
    origin = LOADING_TEXT,
    species = LOADING_TEXT,
    status = LOADING_TEXT,
  } = character ?? {};

  return (
    <article className={styles.card}>
      {isLoading ? (
        <div className={cn('skeleton', styles.cardSkeleton)} />
      ) : (
        <img alt={name} height="300" src={rickAndMortyApi.getImage(id)} width="300" />
      )}
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
