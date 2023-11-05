import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import type { Character } from '@/services/api';

import { CharacterDetailsCard } from '@/components/character-details-card';
import { rickAndMortyApi } from '@/services/api';

import styles from './character-details.module.css';

export function CharacterDetails(): ReactNode {
  const [character, setCharacter] = useState<Character | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const detailsParam = searchParams.get('details');

  useEffect(() => {
    if (!detailsParam) {
      return;
    }

    const detailsId = parseInt(detailsParam, 10);

    if (Number.isNaN(detailsId) || detailsId < 1) {
      setCharacter(null);
      return;
    }

    const controller = new AbortController();

    setIsLoading(true);

    void rickAndMortyApi
      .getById(controller, detailsId)
      .then((character) => setCharacter(character))
      .finally(() => {
        setIsLoading(false);
      });

    return () => {
      controller.abort();
    };
  }, [detailsParam]);

  function handleCloseDetails(): void {
    searchParams.delete('details');
    setSearchParams(searchParams);
  }

  if (!detailsParam) {
    return null;
  }

  return (
    <aside className={styles.aside}>
      <CharacterDetailsCard
        character={character}
        isLoading={isLoading}
        onClose={handleCloseDetails}
      />
    </aside>
  );
}
