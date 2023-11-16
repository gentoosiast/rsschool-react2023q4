import type { ReactNode } from 'react';

import { skipToken } from '@reduxjs/toolkit/dist/query';

import { CharacterDetailsCard } from '@/components/character-details-card';
import { useAppSearchParams } from '@/hooks/use-app-search-params';
import { useGetByIdQuery } from '@/services/api/api';

export function CharacterDetails(): ReactNode {
  const { deleteParam, details } = useAppSearchParams();
  const { data, isError } = useGetByIdQuery(details ?? skipToken);

  function handleCloseDetails(): void {
    deleteParam('details');
  }

  return (
    <aside>
      <CharacterDetailsCard character={data} isError={isError} onClose={handleCloseDetails} />
    </aside>
  );
}
