import type { JSX } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import type { Character } from '@/store/api';

import { getCardImageUrl } from '@/lib/get-card-image-url';
import { getLink } from '@/lib/search-params';

import { LoadingImage } from '../loading-image/loading-image';

import styles from './character-list-item.module.css';

type Props = {
  character: Character;
};

export function CharacterListItem({ character: { id, name } }: Props): JSX.Element {
  const [searchParams] = useSearchParams();

  return (
    <Link className={styles.cardLink} to={getLink(searchParams, 'details', `${id}`)}>
      <article className={styles.card}>
        <LoadingImage
          alt={name}
          height="300"
          loading="lazy"
          src={getCardImageUrl(id)}
          width="300"
        />
        <h2 className={styles.cardHeading}>{name}</h2>
      </article>
    </Link>
  );
}
