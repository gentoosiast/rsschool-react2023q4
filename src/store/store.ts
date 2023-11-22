import type { PreloadedState, Store } from '@reduxjs/toolkit';

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createWrapper, Context } from 'next-redux-wrapper';

import { rickAndMortyApi } from './api';
import settingsReducer from './slices/settings-slice';

const rootReducer = combineReducers({
  [rickAndMortyApi.reducerPath]: rickAndMortyApi.reducer,
  settings: settingsReducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>): Store<RootState> =>
  configureStore({
    devTools: true,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(rickAndMortyApi.middleware),
    preloadedState,
    reducer: rootReducer,
  });

export const store = setupStore();

const makeStore = (context: Context) => store;

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });
