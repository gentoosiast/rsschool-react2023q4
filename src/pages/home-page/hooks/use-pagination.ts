import { useSearchParams } from 'react-router-dom';

import { DEFAULT_ITEMS_PER_PAGE } from '@/services/api/constants';

function validateParam(param: unknown, minAllowedValue: number, fallbackValue: number): number {
  if (typeof param !== 'string') {
    return fallbackValue;
  }

  const value = Number(param);

  if (Number.isInteger(value) && value >= minAllowedValue) {
    return value;
  }

  return fallbackValue;
}

export function usePagination(): { details: number; limit: number; page: number; query: string } {
  const [searchParams] = useSearchParams();

  const page = validateParam(searchParams.get('_page'), 1, 1);
  const limit = validateParam(searchParams.get('_limit'), 1, DEFAULT_ITEMS_PER_PAGE);
  const query = searchParams.get('q') ?? '';
  const details = validateParam(searchParams.get('details'), 1, 0);

  return { details, limit, page, query };
}
