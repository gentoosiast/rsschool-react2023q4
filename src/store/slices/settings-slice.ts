import type { PayloadAction } from '@reduxjs/toolkit';

import { createSlice } from '@reduxjs/toolkit';

import { rickAndMortyApi } from '@/store/api';

export type LoadingStatus = 'error' | 'init' | 'loading' | 'success';

type SettingsState = {
  charactersLoadingStatus: LoadingStatus;
  detailsLoadingStatus: LoadingStatus;
  itemsPerPage: number;
  searchQuery: string;
};

const initialState: SettingsState = {
  charactersLoadingStatus: 'init',
  detailsLoadingStatus: 'init',
  itemsPerPage: 10,
  searchQuery: new URLSearchParams(document.location.search).get('q') ?? '',
};

export const settingsSlice = createSlice({
  extraReducers: (builder) => {
    builder.addMatcher(rickAndMortyApi.endpoints.search.matchPending, (state) => {
      state.charactersLoadingStatus = 'loading';
    });
    builder.addMatcher(rickAndMortyApi.endpoints.search.matchFulfilled, (state) => {
      state.charactersLoadingStatus = 'success';
    });
    builder.addMatcher(rickAndMortyApi.endpoints.search.matchRejected, (state) => {
      state.charactersLoadingStatus = 'error';
    });
    builder.addMatcher(rickAndMortyApi.endpoints.getById.matchPending, (state) => {
      state.detailsLoadingStatus = 'loading';
    });
    builder.addMatcher(rickAndMortyApi.endpoints.getById.matchFulfilled, (state) => {
      state.detailsLoadingStatus = 'success';
    });
    builder.addMatcher(rickAndMortyApi.endpoints.getById.matchRejected, (state) => {
      state.detailsLoadingStatus = 'error';
    });
  },
  initialState,
  name: 'settings',
  reducers: {
    setItemsPerPage(state, action: PayloadAction<number>) {
      state.itemsPerPage = action.payload;
    },

    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
  },
});

export const { setItemsPerPage, setSearchQuery } = settingsSlice.actions;
export default settingsSlice.reducer;
