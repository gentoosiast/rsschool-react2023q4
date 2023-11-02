import type { JSX } from 'react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import type { Character } from '@/services/api';

import { CharacterDetailsCard } from '@/components/character-details-card/character-details-card';
import { Spinner } from '@/components/spinner';
import { deleteSearchParam } from '@/lib/search-params';
import { rickAndMortyApi } from '@/services/api';

import styles from './character-details.module.css';

export function CharacterDetails(): JSX.Element {
  const [character, setCharacter] = useState<Character | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const detailsParam = searchParams.get('details');
  const detailsId = detailsParam ? Number(detailsParam) : 1;

  useEffect(() => {
    setIsLoading(true);
    void rickAndMortyApi
      .getById(detailsId)
      .then((character) => setCharacter(character))
      .finally(() => {
        setIsLoading(false);
      });
  }, [detailsId]);

  function handleCloseDetails(): void {
    setSearchParams(deleteSearchParam(searchParams, 'details'));
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
