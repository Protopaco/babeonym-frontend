import { useSearchParams } from 'react-router-dom';
import { useGivenNames } from '@/state/givenName/givenName.provider';

// The one place the workspace mode is decided. Both the page and the header
// read it, and they are not in a parent/child relationship — the filter surface
// is mounted inside the header — so the value cannot be passed down and had
// previously been derived twice, with different rules.
//
// `mode=compare` in the URL is a request, not a fact: comparing needs at least
// two approved names. While the names are still loading that cannot be checked,
// and the mode is granted rather than refused, because CompareNamesMode already
// renders skeletons when it has no pair. Refusing would show a working filter
// bar and generator that then had to retract.
//
// `canCompareNames` is deliberately not optimistic. It answers whether the user
// may switch modes, so it stays false until the names prove otherwise.
export const useWorkspaceMode = () => {
  const [searchParams] = useSearchParams();
  const { state } = useGivenNames();
  const { approvedGivenNames, givenNameProviderLoaded } = state;

  const compareModeRequested = searchParams.get('mode') === 'compare';
  const canCompareNames = givenNameProviderLoaded && approvedGivenNames.length >= 2;
  const compareModeGranted = compareModeRequested && (canCompareNames || !givenNameProviderLoaded);

  return {
    workspaceMode: compareModeGranted ? ('compare' as const) : ('add' as const),
    canCompareNames,
    // True only once the names have arrived and disproved the request, which is
    // when a stale param is worth removing from the URL.
    shouldClearCompareParam: compareModeRequested && givenNameProviderLoaded && !canCompareNames,
  };
};
