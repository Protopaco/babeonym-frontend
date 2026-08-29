export const writeFilterIds = (searchParams: URLSearchParams, paramKey: string, selectedOptionIds: number[]) => {
  if (selectedOptionIds.length > 0) {
    searchParams.set(paramKey, selectedOptionIds.join(','));
  } else {
    searchParams.delete(paramKey);
  }
};
