export function updateSearchParams(
  params: URLSearchParams,
  updatedParams: Record<string, string>,
): URLSearchParams {
  const newParams = new URLSearchParams(params);

  Object.entries(updatedParams).forEach(([key, value]) => newParams.set(key, value));

  return newParams;
}

export function deleteSearchParam(params: URLSearchParams, key: string): URLSearchParams {
  const newParams = new URLSearchParams(params);

  newParams.delete(key);

  return newParams;
}

export function getLink(params: URLSearchParams, updatedParams: Record<string, string>): string {
  return `?${updateSearchParams(params, updatedParams).toString()}`;
}
