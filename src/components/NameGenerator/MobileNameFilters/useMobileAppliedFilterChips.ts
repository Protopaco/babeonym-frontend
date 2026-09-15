import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { mobileFilterCategories } from '@/components/NameGenerator/MobileNameFilters/mobileFilterCategories';
import { useFilters } from '@/state/filter/filter.context';
import type { WorkspaceAppliedFilterChip } from '@/models/WorkspaceAppliedFilterChip';
import { parseFilterIds } from '@/utils/parseFilterIds';
import { writeFilterIds } from '@/components/NameWorkspace/WorkspaceFilterSurface/writeFilterIds';

// With no room for a chip per category button, the chip row is the only place
// the applied set is visible, and the only way to drop one filter without
// opening its drawer. Clearing them all lives here too, beside removing one.
export const useMobileAppliedFilterChips = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    state: { nameFilters },
  } = useFilters();

  const removeAppliedOption = (paramKey: string, optionId: number) => {
    const nextParams = new URLSearchParams(searchParams);
    writeFilterIds(
      nextParams,
      paramKey,
      parseFilterIds(searchParams, paramKey).filter((appliedOptionId) => appliedOptionId !== optionId)
    );
    setSearchParams(nextParams, { replace: true });
  };

  // One URL update for every category, so the chips leave together rather than
  // one render per category.
  const clearAppliedFilters = () => {
    const nextParams = new URLSearchParams(searchParams);
    mobileFilterCategories.forEach((category) => writeFilterIds(nextParams, category.paramKey, []));
    setSearchParams(nextParams, { replace: true });
  };

  const appliedFilterChips = useMemo<WorkspaceAppliedFilterChip[]>(
    () =>
      mobileFilterCategories.flatMap((category) => {
        const options = nameFilters[category.optionsKey];

        return parseFilterIds(searchParams, category.paramKey)
          .map((optionId) => options.find((option) => option.id === optionId))
          .filter((option) => option !== undefined)
          .map((option) => ({
            id: `${category.paramKey}-${option.id}`,
            label: `${category.chipLabel}: ${option.label}`,
            onDelete: () => removeAppliedOption(category.paramKey, option.id),
          }));
      }),
    [nameFilters, searchParams]
  );

  return { appliedFilterChips, clearAppliedFilters };
};
