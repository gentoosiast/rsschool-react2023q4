import type { BaseSchema, Output } from 'valibot';

import { parse } from 'valibot';

type StorageWrapper = {
  get<T extends BaseSchema<U, V>, U, V>(key: string, schema: T): Output<T> | null;
  set(key: string, value: unknown): void;
};

export function getStorageWrapper(storageProvider: Storage, uniquePrefix: string): StorageWrapper {
  return {
    get<T extends BaseSchema<U, V>, U, V>(key: string, schema: T): Output<T> | null {
      try {
        const strValue = storageProvider.getItem(`${uniquePrefix}${key}`);

        if (!strValue) {
          return null;
        }

        const unknownValue: unknown = JSON.parse(strValue);

        return parse(schema, unknownValue);
      } catch {
        return null;
      }
    },

    set(key: string, value: unknown): void {
      storageProvider.setItem(`${uniquePrefix}${key}`, JSON.stringify(value));
    },
  };
}
