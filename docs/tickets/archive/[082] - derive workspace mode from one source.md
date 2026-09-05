# [082] - Derive Workspace Mode From One Source

## Status

Backlog

## Summary

Compute the workspace mode once and have both consumers read it, instead of
`Header` and `NameWorkspace` each deriving it from the URL with different rules.

## Context

Two components decide independently what mode the workspace is in, and they do
not agree.

`NameWorkspace` guards on whether comparing is possible at all:

```tsx
const workspaceMode = compareModeRequested && canCompareNames ? 'compare' : 'add';
```

`Header` does not:

```tsx
const workspaceMode =
  location.pathname === '/' && searchParams.get('mode') !== 'compare' ? 'add' : 'inactive';
```

So with `mode=compare` in the URL and fewer than two approved names, the header
collapses to the narrow compare bar while the generator is still showing.

`NameWorkspace` has a `useEffect` that strips a stale `mode=compare` param, but
it returns early while `givenNameProviderLoaded` is false, so it does not cover
the load case. A shared or bookmarked link is enough to reach it.

`Header` and `NameWorkspace` are not in a parent/child relationship — the filter
surface is mounted inside `Header` — so the value cannot simply be passed down.

## Requirements

- One place decides the workspace mode; both consumers read that.
- The gating rule is unchanged: compare mode requires `mode=compare` in the URL
  **and** at least two approved names.
- The Compare Names tab stays disabled below two names.
- A stale `mode=compare` param is still stripped from the URL.
- The header and the page agree at every moment, including while names are
  still loading.
- No change to what either mode does or looks like.

## Open Questions

- Whether the param-stripping effect belongs with the shared derivation rather
  than in `NameWorkspace`.

## Decisions

- **A hook**, mounted where it is needed, rather than a context or moving the
  filter surface out of `Header`. Smallest change, and it matches how
  `useSyncWorkspaceFilterParams` already works.
- **While names are loading, both consumers optimistically honour the requested
  mode.** `CompareNamesMode` already falls back to two `NameChipSkeleton`s when
  it has no pair, so guessing compare renders a real loading state. Guessing add
  would show a working filter bar that then has to retract. Once names arrive,
  a `mode=compare` that turns out to be unsupported is stripped and both
  consumers flip to add together.

## Implementation Notes

- `src/pages/NameWorkspace.tsx` holds the correct derivation today, plus the
  effect that strips the param.
- `src/components/Header/Header.tsx` holds the second, unguarded derivation.
- `src/state/givenName/useSyncWorkspaceFilterParams.ts` is the precedent for a
  hook that reads search params and is mounted where it is needed.
- `Header` maps the mode onto its own `'add' | 'inactive'` vocabulary for
  `WorkspaceFilterSurface`; the page uses `'add' | 'compare'`. Whether those
  stay two vocabularies is part of the design.

## Dependencies

- Blocks [075]. That ticket animates three surfaces on a mode switch, and they
  have to move off one shared value or they desynchronize — which is the exact
  failure [075] exists to prevent.

## Acceptance Criteria

- Loading `/?mode=compare` with fewer than two approved names never shows the
  narrow bar with the generator.
- The mode is derived in exactly one place.
- Compare mode still requires two names.
- Nothing about either mode's appearance or behaviour changes.

## Out Of Scope

- Animating the mode transition, which is [075].
- Changing the compare threshold.
- Restructuring the header beyond what the shared value requires.
