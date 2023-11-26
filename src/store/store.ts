import type { PreloadedState, Store } from '@reduxjs/toolkit';

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

import { rickAndMortyApi } from './api';

const rootReducer = combineReducers({
  [rickAndMortyApi.reducerPath]: rickAndMortyApi.reducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>): Store<RootState> =>
  configureStore({
    devTools: true,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(rickAndMortyApi.middleware),
    preloadedState,
    reducer: rootReducer,
  });

export const makeStore = () =>
  configureStore({
    middleware: (gDM) => gDM().concat(rickAndMortyApi.middleware),
    reducer: rootReducer,
  });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(makeStore);
