import { configureStore } from '@reduxjs/toolkit';

import formsReducer from './slices/forms-slice';

export const store = configureStore({
  reducer: formsReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
