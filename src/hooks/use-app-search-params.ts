import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

import { validateNumericParam } from '@/lib/validate-numeric-param';
import { DEFAULT_ITEMS_PER_PAGE, MAX_ITEMS_PER_PAGE } from '@/store/api/constants';

export function useAppSearchParams(): {
  deleteParam: (param: string) => void;
  details: null | number;
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

  const page = validateNumericParam(searchParams.get('_page'), 1, Infinity, 1);
  const limit = validateNumericParam(
    searchParams.get('_limit'),
    1,
    MAX_ITEMS_PER_PAGE,
    DEFAULT_ITEMS_PER_PAGE,
  );
  const query = searchParams.get('q') ?? '';
  const details = validateNumericParam(searchParams.get('details'), 1, Infinity, 0) || null;

  return { deleteParam, details, limit, page, query, setParams };
}
