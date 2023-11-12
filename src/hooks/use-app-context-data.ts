import { useContext } from 'react';

import type { AppState } from '@/providers/app-provider/types';

import { AppContextData } from '@/providers/app-provider/app-provider';

export const useAppContextData = (): AppState => {
  const context = useContext(AppContextData);

  if (!context) {
    throw new Error('useAppContextData must be used within a AppProvider');
  }

  return context;
};
