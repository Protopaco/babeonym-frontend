import { useSearchParams } from 'react-router-dom';

// The one place the workspace mode is decided. Both the page and the header
// read it, and they are not in a parent/child relationship — the filter surface
// is mounted inside the header — so the value cannot be passed down and had
// previously been derived twice, with different rules.
//
// Compare is never refused. CompareNamesMode explains itself when there are too
// few names to pair, which beats a tab that says you cannot go there.
export const useWorkspaceMode = () => {
  const [searchParams] = useSearchParams();
  const compareModeRequested = searchParams.get('mode') === 'compare';

  return {
    workspaceMode: compareModeRequested ? ('compare' as const) : ('add' as const),
  };
};
