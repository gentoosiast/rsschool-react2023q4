import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import type { Character } from '@/services/api';

import { CharacterDetailsCard } from '@/components/character-details-card';
import { Spinner } from '@/components/spinner';
import { rickAndMortyApi } from '@/services/api';

import styles from './character-details.module.css';

export function CharacterDetails(): ReactNode {
  const [character, setCharacter] = useState<Character | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const detailsParam = searchParams.get('details');

  useEffect(() => {
    const detailsId = Number(detailsParam);

    if (isNaN(detailsId) || !Number.isInteger(detailsId) || detailsId < 1) {
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
      {isLoading ? (
        <Spinner />
      ) : (
        <CharacterDetailsCard character={character} onClose={handleCloseDetails} />
      )}
    </aside>
  );
}
