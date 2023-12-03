import type { TestFunction } from 'yup';

import { ALLOWED_FILETYPES, IMAGE_MAX_SIZE } from './constants';

export const isFileSizeOK: TestFunction<unknown> = (files: unknown) => {
  if (!(files instanceof FileList)) {
    return false;
  }

  return Array.from(files).every((file) => file.size <= IMAGE_MAX_SIZE);
};

export const isFiletypeAllowed: TestFunction<unknown> = (files: unknown) => {
  if (!(files instanceof FileList)) {
    return false;
  }

  return Array.from(files).every((file) => ALLOWED_FILETYPES.includes(file.type));
};
