import type { ReactNode } from 'react';

import Image from 'next/image';

import type { Character } from '@/store/api';

import { CharacterListItem } from '@/components/character-list-item';

import styles from './character-list.module.css';

type Props = {
  characters: Character[];
};

export function CharacterList({ characters }: Props): ReactNode {
  if (characters.length === 0) {
    return (
      <div className={styles.noResults}>
        <Image alt="Rick and Morty crying" height="720" src="/rick-morty-sad.jpg" width="821" />
        <h1>No characters found</h1>
      </div>
    );
  }

  return (
    <section className={styles.cards}>
      {characters.map((character) => (
        <CharacterListItem character={character} key={character.id} />
      ))}
    </section>
  );
}
