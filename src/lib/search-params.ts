export function getLink(
  params: URLSearchParams,
  key: string,
  value: string
): string {
  params.set(key, value);

  return `?${params.toString()}`;
}
