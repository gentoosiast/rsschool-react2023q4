import type { PayloadAction } from '@reduxjs/toolkit';

import { createSlice } from '@reduxjs/toolkit';

import { validateNumericParam } from '@/lib/validate-numeric-param';
import { rickAndMortyApi } from '@/store/api';

import { DEFAULT_ITEMS_PER_PAGE, MAX_ITEMS_PER_PAGE } from '../api/constants';

export type LoadingStatus = 'error' | 'init' | 'loading' | 'success';

type SettingsState = {
  charactersLoadingStatus: LoadingStatus;
  detailsLoadingStatus: LoadingStatus;
  itemsPerPage: number;
  searchQuery: string;
};

// const searchParams = new URLSearchParams(document.location.search);
const searchParams = new URLSearchParams();

const initialState: SettingsState = {
  charactersLoadingStatus: 'init',
  detailsLoadingStatus: 'init',
  itemsPerPage: validateNumericParam(
    searchParams.get('_limit'),
    1,
    MAX_ITEMS_PER_PAGE,
    DEFAULT_ITEMS_PER_PAGE,
  ),
  searchQuery: searchParams.get('q') ?? '',
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
