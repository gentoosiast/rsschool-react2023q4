import type { ReactNode } from 'react';

import type { LoadingStatus } from '@/store';
import type { Character } from '@/store/api';

import { LoadingImage } from '@/components/loading-image';
import { getCardImageUrl } from '@/lib/get-card-image-url';

import styles from './character-details-card.module.css';

type Props = {
  character?: Character;
  loadingStatus: LoadingStatus;
  onClose: () => void;
};

export function CharacterDetailsCard({ character, loadingStatus, onClose }: Props): ReactNode {
  const LOADING_TEXT = 'Loading…';
  const LOADING_ELEM = <span className={styles.loadingText}>{LOADING_TEXT}</span>;
  const {
    gender = LOADING_ELEM,
    id = -1,
    location = LOADING_ELEM,
    name = LOADING_ELEM,
    origin = LOADING_ELEM,
    species = LOADING_ELEM,
    status = LOADING_ELEM,
  } = loadingStatus === 'loading' || !character ? {} : character;

  if (loadingStatus === 'error') {
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
    <article className={styles.card} data-testid="details-card">
      <LoadingImage
        alt={character?.name ?? LOADING_TEXT}
        height="300"
        src={getCardImageUrl(id)}
        width="300"
      />
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
