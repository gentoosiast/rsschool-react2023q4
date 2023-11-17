import type { JSX } from 'react';

import { useAppSelector } from '@/store/hooks';

export function TestReduxStore(): JSX.Element {
  const searchQuery = useAppSelector((state) => state.settings.searchQuery);
  const itemsPerPage = useAppSelector((state) => state.settings.itemsPerPage);

  return (
    <>
      <p>search query: {searchQuery}</p>
      <p>items per page: {itemsPerPage}</p>
    </>
  );
}
