import type { LocationState } from './types';

export const isLocationState = (value: unknown): value is LocationState =>
  typeof value === 'object' && value !== null && 'from' in value && typeof value.from === 'string';
