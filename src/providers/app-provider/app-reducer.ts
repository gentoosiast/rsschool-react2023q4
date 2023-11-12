import type { AppAction, AppState } from './types';

export function appReducer(state: AppState, action: AppAction): AppState {
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
