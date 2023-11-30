import type { PayloadAction } from '@reduxjs/toolkit';

import { createSlice } from '@reduxjs/toolkit';

import type { FormValues } from '@/validations';

export type FormsState = {
  reactHookForm: FormValues | null;
  uncontrolledForm: FormValues | null;
};

const initialState: FormsState = {
  reactHookForm: null,
  uncontrolledForm: null,
};

export const formsSlice = createSlice({
  initialState,
  name: 'forms',
  reducers: {
    setReactHookForm: (state, action: PayloadAction<FormValues>) => {
      state.reactHookForm = action.payload;
    },
    setUncontrolledForm: (state, action: PayloadAction<FormValues>) => {
      state.uncontrolledForm = action.payload;
    },
  },
});

export const { setReactHookForm, setUncontrolledForm } = formsSlice.actions;
export default formsSlice.reducer;
