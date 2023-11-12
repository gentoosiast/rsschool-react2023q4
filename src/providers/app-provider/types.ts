import type { ApiResponse } from '@/services/api';

export type AppState = {
  apiResponse: ApiResponse | null;
  isLoading: boolean;
  searchQuery: string;
};

export type AppApi = {
  setApiResponse: (apiResponse: ApiResponse | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  setSearchQuery: (searchQuery: string) => void;
};

export type AppAction =
  | { payload: ApiResponse | null; type: 'setApiResponse' }
  | { payload: boolean; type: 'setIsLoading' }
  | { payload: string; type: 'setSearchQuery' };
