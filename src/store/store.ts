import type { PreloadedState, Store } from '@reduxjs/toolkit';

import { combineReducers, configureStore } from '@reduxjs/toolkit';

import settingsReducer from './slices/settings-slice';

const rootReducer = combineReducers({
  settings: settingsReducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>): Store<RootState> =>
  configureStore({
    devTools: true,
    preloadedState,
    reducer: rootReducer,
  });

export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
