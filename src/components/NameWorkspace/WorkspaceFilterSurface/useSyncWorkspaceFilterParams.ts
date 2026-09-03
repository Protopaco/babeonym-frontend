import { useEffect, useMemo, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { parseFilterIds } from '@/components/NameWorkspace/WorkspaceFilterSurface/parseFilterIds';
import { useGivenNamesActions } from '@/state/givenName/givenName.provider';
import type { SelectedNameFilters } from '@/state/givenName/givenName.types';

// Watching the params rather than the Set Filters button covers every way the
// applied set can change: committing a draft, deleting a chip, browser back and
// forward, and opening a URL that already carries filters.
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
    const hasAppliedFilters = Object.values(appliedFilters).some((filterIds) => filterIds.length > 0);

    lastAppliedFilters.current = serializedFilters;

    // A first run with no filters is the ordinary page load, where the boot
    // fetch has already asked for candidates. Refetching would throw that queue
    // away, and on mobile it would clear selections the accordions hold in
    // provider state and never mirror into the URL.
    if (isFirstRun && !hasAppliedFilters) return;

    applyFilters(appliedFilters);
  }, [appliedFilters]);
};
