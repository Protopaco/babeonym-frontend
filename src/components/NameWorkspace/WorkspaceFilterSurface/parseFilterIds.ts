export const parseFilterIds = (searchParams: URLSearchParams, paramKey: string) => [
  ...new Set(
    (searchParams.get(paramKey) ?? '')
      .split(',')
      .map(Number)
      .filter((filterId) => Number.isInteger(filterId) && filterId > 0)
  ),
];
