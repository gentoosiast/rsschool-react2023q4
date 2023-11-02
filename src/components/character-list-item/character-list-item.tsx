import type { JSX } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import type { Character } from '@/services/api';

import { getLink } from '@/lib/search-params';

import styles from './character-list-item.module.css';

type Props = {
  character: Character;
};

export function CharacterListItem({ character: { id, image, name } }: Props): JSX.Element {
  const [searchParams] = useSearchParams();

  return (
    <article className={styles.card}>
      <Link className={styles.cardLink} to={getLink(searchParams, { details: `${id}` })}>
        <img alt={name} height="300" src={image} width="300" />
        <h2 className={styles.cardHeading}>{name}</h2>
      </Link>
    </article>
  );
}
