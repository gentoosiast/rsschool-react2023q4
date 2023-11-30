import type { TestFunction } from 'yup';

export const isFileSizeOK: TestFunction<unknown> = (files: unknown) => {
  const MAX_SIZE = 1024 * 1024;

  if (!(files instanceof FileList)) {
    return false;
  }

  return Array.from(files).every((file) => file.size <= MAX_SIZE);
};

export const isFiletypeAllowed: TestFunction<unknown> = (files: unknown) => {
  const ALLOWED_FILETYPES = ['image/png', 'image/jpeg'];

  if (!(files instanceof FileList)) {
    return false;
  }

  return Array.from(files).every((file) => ALLOWED_FILETYPES.includes(file.type));
};
