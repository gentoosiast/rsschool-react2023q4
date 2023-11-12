import { createContext, useMemo, useReducer } from 'react';
import type { JSX, ReactNode } from 'react';

import type { ApiResponse } from '@/services/api';

import type { AppApi, AppState } from './types';

import { appReducer } from './app-reducer';

const defaultInitialState: AppState = {
  apiResponse: null,
  isLoading: false,
  searchQuery: '',
};

export const AppContextData = createContext<AppState | null>(null);
export const AppContextApi = createContext<AppApi | null>(null);

type Props = {
  children: ReactNode;
  initialState?: AppState;
};

export const AppProvider = ({ children, initialState }: Props): JSX.Element => {
  const [state, dispatch] = useReducer(appReducer, initialState ?? defaultInitialState);

  const data = useMemo(
    () => ({
      apiResponse: state.apiResponse,
      isLoading: state.isLoading,
      searchQuery: state.searchQuery,
    }),
    [state],
  );

  const api = useMemo(() => {
    return {
      setApiResponse: (apiResponse: ApiResponse | null) =>
        dispatch({ payload: apiResponse, type: 'setApiResponse' }),
      setIsLoading: (isLoading: boolean) => dispatch({ payload: isLoading, type: 'setIsLoading' }),
      setSearchQuery: (searchQuery: string) =>
        dispatch({ payload: searchQuery, type: 'setSearchQuery' }),
    };
  }, []);

  return (
    <AppContextData.Provider value={data}>
      <AppContextApi.Provider value={api}>{children}</AppContextApi.Provider>
    </AppContextData.Provider>
  );
};
