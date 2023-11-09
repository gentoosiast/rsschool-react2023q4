import { useContext } from 'react';
import type { Dispatch, SetStateAction } from 'react';

import { SetSearchQueryContext } from '@/providers/search-query-provider';

export const useSetSearchQueryContext = (): Dispatch<SetStateAction<string>> => {
  const setSearchQuery = useContext(SetSearchQueryContext);

  if (!setSearchQuery) {
    throw new Error('useSetSearchQueryContext must be used within a SetSearchQueryProvider');
  }

  return setSearchQuery;
};
