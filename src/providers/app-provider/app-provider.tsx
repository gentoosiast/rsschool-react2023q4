import { createContext, useReducer } from 'react';
import type { JSX, ReactNode } from 'react';

import type { AppContextValue, AppState } from './types';

import { appReducer } from './app-reducer';

const appInitialState: AppState = {
  apiResponse: null,
  isLoading: false,
  searchQuery: '',
};

export const AppContext = createContext<AppContextValue | null>(null);

type Props = {
  children: ReactNode;
};

export const AppProvider = ({ children }: Props): JSX.Element => {
  const [state, dispatch] = useReducer(appReducer, appInitialState);

  return <AppContext.Provider value={{ dispatch, state }}>{children}</AppContext.Provider>;
};
