import { createContext, useReducer } from 'react';
import type { Dispatch, JSX, ReactNode } from 'react';

import type { ApiResponse } from '@/services/api';

type State = {
  apiResponse: ApiResponse | null;
  isLoading: boolean;
  searchQuery: string;
};

type Action =
  | { payload: ApiResponse | null; type: 'setApiResponse' }
  | { payload: boolean; type: 'setIsLoading' }
  | { payload: string; type: 'setSearchQuery' };

const initialState: State = {
  apiResponse: null,
  isLoading: false,
  searchQuery: '',
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'setApiResponse':
      return {
        ...state,
        apiResponse: action.payload,
      };
    case 'setSearchQuery':
      return {
        ...state,
        searchQuery: action.payload,
      };
    case 'setIsLoading':
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
}

export type AppContextValue = {
  dispatch: Dispatch<Action>;
  state: State;
};

export const AppContext = createContext<AppContextValue | null>(null);

type Props = {
  children: ReactNode;
};

export const AppProvider = ({ children }: Props): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <AppContext.Provider value={{ dispatch, state }}>{children}</AppContext.Provider>;
};
