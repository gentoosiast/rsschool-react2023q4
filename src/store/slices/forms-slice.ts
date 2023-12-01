import type { PayloadAction } from '@reduxjs/toolkit';

import { createSlice } from '@reduxjs/toolkit';
import { getNames } from 'country-list';

import type { FormValues } from '@/validations';

export type FormState = Omit<FormValues, 'picture'> & { picture: string };

export type FormsSlice = {
  countries: string[];
  reactHookForm: FormState | null;
  uncontrolledForm: FormState | null;
};

const initialState: FormsSlice = {
  countries: getNames(),
  reactHookForm: null,
  uncontrolledForm: null,
};

export const formsSlice = createSlice({
  initialState,
  name: 'forms',
  reducers: {
    setReactHookForm: (state, action: PayloadAction<FormState>) => {
      state.reactHookForm = action.payload;
    },
    setUncontrolledForm: (state, action: PayloadAction<FormState>) => {
      state.uncontrolledForm = action.payload;
    },
  },
});

export const { setReactHookForm, setUncontrolledForm } = formsSlice.actions;
export default formsSlice.reducer;