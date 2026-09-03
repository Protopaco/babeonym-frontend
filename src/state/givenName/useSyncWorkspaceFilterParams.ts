import { useEffect, useMemo, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { parseFilterIds } from '@/utils/parseFilterIds';
import { useGivenNamesActions } from '@/state/givenName/givenName.provider';
import type { SelectedNameFilters } from '@/state/givenName/givenName.types';

// The single path from applied filters to a refetch, for both the desktop
// surface and the mobile bar. Watching the params rather than either Set Filters
// button covers every way the applied set can change: committing a draft,
// deleting a chip, browser back and forward, and opening a URL that already
// carries filters.
export const useSyncWorkspaceFilterParams = () => {
  const [searchParams] = useSearchParams();
  const { applyFilters } = useGivenNamesActions();

  const appliedFilters = useMemo<SelectedNameFilters>(
    () => ({
      genderIds: parseFilterIds(searchParams, 'genders'),
      decadeIds: parseFilterIds(searchParams, 'decades'),
      languageIds: parseFilterIds(searchParams, 'languages'),
      cultureIds: parseFilterIds(searchParams, 'cultures'),
    }),
    [searchParams]
  );

  const lastAppliedFilters = useRef<string | null>(null);

  useEffect(() => {
    const serializedFilters = JSON.stringify(appliedFilters);

    // Any other param changing, mode among them, re-runs this without the
    // filters having moved.
    if (lastAppliedFilters.current === serializedFilters) return;

    const isFirstRun = lastAppliedFilters.current === null;
    lastAppliedFilters.current = serializedFilters;

    // The provider's boot fetch reads the same params, so the first run is
    // already covered. Refetching here would only throw that queue away.
    if (isFirstRun) return;

    applyFilters(appliedFilters);
  }, [appliedFilters]);
};
