import { useCallback } from 'react';
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

export function useParams(): {
  deleteParam: (param: string) => void;
  details: number;
  limit: number;
  page: number;
  query: string;
  setParams: (params: Record<string, string>) => void;
} {
  const [searchParams, setSearchParams] = useSearchParams();

  const deleteParam = useCallback(
    (param: string): void => {
      searchParams.delete(param);
      setSearchParams(searchParams);
    },
    [searchParams, setSearchParams],
  );

  const setParams = useCallback(
    (params: Record<string, string>): void => {
      Object.entries(params).forEach(([key, value]) => {
        searchParams.set(key, value);
      });
      setSearchParams(searchParams);
    },
    [searchParams, setSearchParams],
  );

  const page = validateNumericParam(searchParams.get('_page'), 1, 1);
  const limit = validateNumericParam(searchParams.get('_limit'), 1, DEFAULT_ITEMS_PER_PAGE);
  const query = searchParams.get('q') ?? '';
  const details = validateNumericParam(searchParams.get('details'), 1, 0);

  return { deleteParam, details, limit, page, query, setParams };
}
