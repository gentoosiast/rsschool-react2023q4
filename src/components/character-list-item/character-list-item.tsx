import type { JSX } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import type { Character } from '@/store/api';

import { getCardImageUrl } from '@/lib/get-card-image-url';
import { shimmer, toBase64 } from '@/lib/shimmer-placeholder';

import styles from './character-list-item.module.css';

type Props = {
  character: Character;
};

export function CharacterListItem({ character: { id, name } }: Props): JSX.Element {
  const router = useRouter();
  const searchParams = router.query;

  return (
    <Link className={styles.cardLink} href={{ query: { ...searchParams, details: id } }}>
      <article className={styles.card}>
        <Image
          alt={name}
          height="300"
          loading="lazy"
          placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(300, 300))}`}
          src={getCardImageUrl(id)}
          width="300"
        />
        <h2 className={styles.cardHeading}>{name}</h2>
      </article>
    </Link>
  );
}
