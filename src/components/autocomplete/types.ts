import type { ChangeEventHandler, FocusEventHandler } from 'react';

export type AutoCompleteProps = {
  completionSource: string[];
  name: string;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onChange?: ChangeEventHandler<HTMLInputElement>;
};
