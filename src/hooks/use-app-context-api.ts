import { useContext } from 'react';

import type { AppApi } from '@/providers/app-provider/types';

import { AppContextApi } from '@/providers/app-provider/app-provider';

export const useAppContextApi = (): AppApi => {
  const context = useContext(AppContextApi);

  if (!context) {
    throw new Error('useAppContextApi must be used within a AppProvider');
  }

  return context;
};
