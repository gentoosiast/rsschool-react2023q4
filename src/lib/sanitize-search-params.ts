import { maxValue, minValue, number, parse } from 'valibot';

import { DEFAULT_ITEMS_PER_PAGE, MAX_ITEMS_PER_PAGE } from '@/store/api/constants';

function validateNumericParam(
  param: unknown,
  minAllowedValue: number,
  maxAllowedValue: number,
  fallbackValue: number,
): number {
  if (typeof param !== 'string') {
    return fallbackValue;
  }

  const value = parseInt(param, 10);

  try {
    return parse(number([minValue(minAllowedValue), maxValue(maxAllowedValue)]), value);
  } catch {
    return fallbackValue;
  }
}

type SanitizeAppFunctionParams = Record<string, unknown>;

type AppSearchParams = {
  details: null | number;
  limit: number;
  page: number;
  query: string;
};

export function sanitizeAppSearchParams({
  detailsParam,
  limitParam,
  pageParam,
  queryParam,
}: SanitizeAppFunctionParams): AppSearchParams {
  return {
    details: validateNumericParam(detailsParam, 1, Infinity, 0) || null,
    limit: validateNumericParam(limitParam, 1, MAX_ITEMS_PER_PAGE, DEFAULT_ITEMS_PER_PAGE),
    page: validateNumericParam(pageParam, 1, Infinity, 1),
    query: typeof queryParam === 'string' ? queryParam : '',
  };
}
