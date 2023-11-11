import { createContext, useReducer } from 'react';
import type { JSX, ReactNode } from 'react';

import type { AppContextValue, AppState } from './types';

import { appReducer } from './app-reducer';

const defaultInitialState: AppState = {
  apiResponse: null,
  isLoading: false,
  searchQuery: '',
};

export const AppContext = createContext<AppContextValue | null>(null);

type Props = {
  children: ReactNode;
  initialState?: AppState;
};

export const AppProvider = ({ children, initialState }: Props): JSX.Element => {
  const [state, dispatch] = useReducer(appReducer, initialState ?? defaultInitialState);

  return <AppContext.Provider value={{ dispatch, state }}>{children}</AppContext.Provider>;
};
