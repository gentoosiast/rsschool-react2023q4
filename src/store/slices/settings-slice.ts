import type { PayloadAction } from '@reduxjs/toolkit';

import { createSlice } from '@reduxjs/toolkit';

type SettingsState = {
  itemsPerPage: number;
  searchQuery: string;
};

const initialState: SettingsState = {
  itemsPerPage: 10,
  searchQuery: new URLSearchParams(document.location.search).get('q') ?? '',
};

export const settingsSlice = createSlice({
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
