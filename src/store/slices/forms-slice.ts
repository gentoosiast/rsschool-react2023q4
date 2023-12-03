import type { PayloadAction } from '@reduxjs/toolkit';

import { createSlice } from '@reduxjs/toolkit';
import { getNames } from 'country-list';

import type { FormValues } from '@/validations';

export type FormState = Omit<FormValues, 'picture'> & { picture: string; submitDate: number };

export type FormsSlice = {
  countries: string[];
  submits: FormState[];
};

const initialState: FormsSlice = {
  countries: getNames(),
  submits: [],
};

export const formsSlice = createSlice({
  initialState,
  name: 'forms',
  reducers: {
    addFormSubmit: (state, action: PayloadAction<FormState>) => {
      state.submits.unshift(action.payload);
    },
  },
});

export const { addFormSubmit } = formsSlice.actions;
export default formsSlice.reducer;
