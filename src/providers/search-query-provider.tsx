import { createContext, useState } from 'react';
import type { Dispatch, JSX, ReactNode, SetStateAction } from 'react';

import { useParams } from '@/hooks/use-params';

export const SearchQueryContext = createContext<null | string>(null);
export const SetSearchQueryContext = createContext<Dispatch<SetStateAction<string>> | null>(null);

type Props = {
  children: ReactNode;
};

export function Providers({ children }: Props): JSX.Element {
  const { query } = useParams();
  const [searchQuery, setSearchQuery] = useState(query);

  return (
    <SearchQueryContext.Provider value={searchQuery}>
      <SetSearchQueryContext.Provider value={setSearchQuery}>
        {children}
      </SetSearchQueryContext.Provider>
    </SearchQueryContext.Provider>
  );
}
