import type { MouseEvent, ReactNode } from 'react';

import Image from 'next/image';

import type { Character } from '@/store/api';

import { getCardImageUrl } from '@/lib/get-card-image-url';
import { shimmer, toBase64 } from '@/lib/shimmer-placeholder';

import styles from './character-details-card.module.css';

type Props = {
  character: Character;
  onClose: (e: MouseEvent) => void;
};

export function CharacterDetailsCard({ character, onClose }: Props): ReactNode {
  const { gender, id, location, name, origin, species, status } = character;

  function handleClose(event: MouseEvent) {
    onClose(event);
  }

  return (
    <article className={styles.card} data-testid="details-card">
      <Image
        alt={name}
        height="300"
        placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(300, 300))}`}
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
      <button
        aria-label="Close"
        className={styles.closeButton}
        name="Close"
        onClick={(e) => handleClose(e)}
        type="button"
      >
        ×
      </button>
    </article>
  );
}
