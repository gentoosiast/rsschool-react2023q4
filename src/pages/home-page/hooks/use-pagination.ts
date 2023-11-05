import { useSearchParams } from 'react-router-dom';

import { DEFAULT_ITEMS_PER_PAGE } from '@/services/api/constants';

function validateNumericParam(
  param: unknown,
  minAllowedValue: number,
  fallbackValue: number,
): number {
  if (typeof param !== 'string') {
    return fallbackValue;
  }

  const value = parseInt(param, 10);

  if (!Number.isNaN(value) && value >= minAllowedValue) {
    return value;
  }

  return fallbackValue;
}

export function usePagination(): { details: number; limit: number; page: number; query: string } {
  const [searchParams] = useSearchParams();

  const page = validateNumericParam(searchParams.get('_page'), 1, 1);
  const limit = validateNumericParam(searchParams.get('_limit'), 1, DEFAULT_ITEMS_PER_PAGE);
  const query = searchParams.get('q') ?? '';
  const details = validateNumericParam(searchParams.get('details'), 1, 0);

  return { details, limit, page, query };
}
