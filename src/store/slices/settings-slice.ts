import type { PayloadAction } from '@reduxjs/toolkit';

import { createSlice } from '@reduxjs/toolkit';

type SettingsState = {
  areCharactersLoading: boolean;
  isDetailsLoading: boolean;
  itemsPerPage: number;
  searchQuery: string;
};

const initialState: SettingsState = {
  areCharactersLoading: false,
  isDetailsLoading: false,
  itemsPerPage: 10,
  searchQuery: new URLSearchParams(document.location.search).get('q') ?? '',
};

export const settingsSlice = createSlice({
  initialState,
  name: 'settings',
  reducers: {
    setAreCharactersLoading(state, action: PayloadAction<boolean>) {
      state.areCharactersLoading = action.payload;
    },

    setIsDetailsLoading(state, action: PayloadAction<boolean>) {
      state.isDetailsLoading = action.payload;
    },

    setItemsPerPage(state, action: PayloadAction<number>) {
      state.itemsPerPage = action.payload;
    },

    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
  },
});

export const { setAreCharactersLoading, setIsDetailsLoading, setItemsPerPage, setSearchQuery } =
  settingsSlice.actions;
export default settingsSlice.reducer;
