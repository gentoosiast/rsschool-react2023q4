import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';

import type { Character } from '@/services/api';

import { CharacterDetailsCard } from '@/components/character-details-card';
import { useParams } from '@/hooks/use-params';
import { rickAndMortyApi } from '@/services/api';

export function CharacterDetails(): ReactNode {
  const [character, setCharacter] = useState<Character | null>(null);
  const [isError, setIsError] = useState(false);
  const { deleteParam, details } = useParams();

  useEffect(() => {
    if (!details) {
      setCharacter(null);
      return;
    }

    const controller = new AbortController();

    void rickAndMortyApi.getById(controller, details).then((character) => {
      if (!character) {
        setCharacter(null);
        setIsError(true);
      } else {
        setCharacter(character);
        setIsError(false);
      }
    });

    return () => {
      controller.abort();
    };
  }, [details]);

  function handleCloseDetails(): void {
    deleteParam('details');
  }

  return (
    <>
      {details > 0 && (
        <aside>
          <CharacterDetailsCard
            character={character}
            isError={isError}
            onClose={handleCloseDetails}
          />
        </aside>
      )}
    </>
  );
}
