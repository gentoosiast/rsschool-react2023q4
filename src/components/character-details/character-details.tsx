import type { ReactNode } from 'react';

import { skipToken } from '@reduxjs/toolkit/dist/query';

import { CharacterDetailsCard } from '@/components/character-details-card';
import { useAppSearchParams } from '@/hooks/use-app-search-params';
import { useGetByIdQuery } from '@/store/api';
import { useAppSelector } from '@/store/hooks';

export function CharacterDetails(): ReactNode {
  const { deleteParam, details } = useAppSearchParams();
  const { data: character } = useGetByIdQuery(details ?? skipToken);
  const loadingStatus = useAppSelector((state) => state.settings.detailsLoadingStatus);

  function handleCloseDetails(): void {
    deleteParam('details');
  }

  return (
    <aside>
      <CharacterDetailsCard
        character={character}
        loadingStatus={loadingStatus}
        onClose={handleCloseDetails}
      />
    </aside>
  );
}
