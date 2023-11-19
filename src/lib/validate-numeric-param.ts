import { maxValue, minValue, number, parse } from 'valibot';

export function validateNumericParam(
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
