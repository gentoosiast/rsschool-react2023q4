import type { ReactNode } from 'react';

import type { Character } from '@/services/api';

import { LoadingImage } from '@/components/loading-image';
import { rickAndMortyApi } from '@/services/api';

import styles from './character-details-card.module.css';

type Props = {
  character: Character | null;
  isError: boolean;
  onClose: () => void;
};

export function CharacterDetailsCard({ character, isError, onClose }: Props): ReactNode {
  const LOADING_TEXT = 'Loading…';
  const {
    gender = LOADING_TEXT,
    id = -1,
    location = LOADING_TEXT,
    name = LOADING_TEXT,
    origin = LOADING_TEXT,
    species = LOADING_TEXT,
    status = LOADING_TEXT,
  } = character ?? {};

  if (isError) {
    return (
      <article className={styles.card}>
        <img alt="Pixelated word 'Error'" height="300" src="/error-pixelated.jpg" width="300" />
        <h2 className={styles.cardHeading}>Error loading character</h2>
        <button className={styles.closeButton} onClick={() => onClose()} type="button">
          ×
        </button>
      </article>
    );
  }

  return (
    <article className={styles.card}>
      <LoadingImage alt={name} height="300" src={rickAndMortyApi.getImage(id)} width="300" />
      <h2 className={styles.cardHeading}>{name}</h2>
      <div className={styles.cardInfo}>
        <p>
          <span className={styles.cardInfoKey}>Status:</span>{' '}
          <span className={styles.cardInfoValue}>{status}</span>
        </p>
        <p>
          <span className={styles.cardInfoKey}>Species:</span>{' '}
          <span className={styles.cardInfoValue}>{species}</span>
        </p>
        <p>
          <span className={styles.cardInfoKey}>Gender:</span>{' '}
          <span className={styles.cardInfoValue}>{gender}</span>
        </p>
        <p>
          <span className={styles.cardInfoKey}>Origin:</span>{' '}
          <span className={styles.cardInfoValue}>{origin}</span>
        </p>
        <p>
          <span className={styles.cardInfoKey}>Location:</span>{' '}
          <span className={styles.cardInfoValue}>{location}</span>
        </p>
      </div>
      <button className={styles.closeButton} onClick={() => onClose()} type="button">
        ×
      </button>
    </article>
  );
}
