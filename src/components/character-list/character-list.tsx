import type { ReactNode } from 'react';

import { CharacterListItem } from '@/components/character-list-item';
import { useAppContext } from '@/hooks/use-app-context';

import styles from './character-list.module.css';

export function CharacterList(): ReactNode {
  const {
    state: { apiResponse },
  } = useAppContext();
  const characters = apiResponse?.characters;

  if (!characters) {
    return null;
  }

  if (characters.length === 0) {
    return (
      <div className={styles.noResults}>
        <img alt="Rick and Morty crying" height="720" src="/rick-morty-sad.jpg" width="821" />
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
