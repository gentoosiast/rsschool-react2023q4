import { useContext } from 'react';

import { SearchQueryContext } from '@/providers/search-query-provider';

export const useSearchQueryContext = (): string => {
  const searchQuery = useContext(SearchQueryContext);

  if (!searchQuery && typeof searchQuery === 'object') {
    throw new Error('useSearchQueryContext must be used within a SearchQueryProvider');
  }

  return searchQuery;
};
