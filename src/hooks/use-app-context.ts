import { useContext } from 'react';

import type { AppContextValue } from '@/providers/app-provider';

import { AppContext } from '@/providers/app-provider';

export const useAppContext = (): AppContextValue => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useAppContext must be used within a AppProvider');
  }

  return context;
};
