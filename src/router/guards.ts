import type { LocationState } from './types';

export const isLocationState = (value: unknown): value is LocationState =>
  typeof value === 'object' &&
  value !== null &&
  'submitDate' in value &&
  typeof value.submitDate === 'number';
