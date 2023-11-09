import type { Dispatch } from 'react';

import type { ApiResponse } from '@/services/api';

export type AppState = {
  apiResponse: ApiResponse | null;
  isLoading: boolean;
  searchQuery: string;
};

export type AppAction =
  | { payload: ApiResponse | null; type: 'setApiResponse' }
  | { payload: boolean; type: 'setIsLoading' }
  | { payload: string; type: 'setSearchQuery' };

export type AppContextValue = {
  dispatch: Dispatch<AppAction>;
  state: AppState;
};
