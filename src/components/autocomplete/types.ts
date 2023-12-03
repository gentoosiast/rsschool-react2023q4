import type { ChangeEventHandler, FocusEventHandler, InputHTMLAttributes } from 'react';

export type AutoCompleteProps = {
  completionSource: string[];
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onChange?: ChangeEventHandler<HTMLInputElement>;
} & InputHTMLAttributes<HTMLInputElement>;
