# [104] - Add A Clear All Button For Applied Filters On Mobile

## Status

Backlog

## Summary

Desktop has a Clear All button at the end of the applied filter row. Mobile does
not, so clearing several filters means deleting each chip one at a time. Add a
mobile equivalent.

## Context

- **Desktop:** `WorkspaceFilterLayout.tsx` shows `WorkspaceClearFiltersButton`
  only when filters are applied, calling `clearAppliedFilters` from
  `useWorkspaceFilterDraftState`.
- **Why desktop hides it:** with no chips there is no row to bound, so it is
  absent rather than disabled.
- **Styling:** it is styled for the desktop's primary-coloured strip, with
  contrast text.
- **Mobile tray:** `MobileNameFilters.tsx` gets its chips from
  `useMobileAppliedFilterChips` and has no clear-all action. Its chip row is one
  horizontally scrolling line, 40px high.

## Requirements

- When filters are applied on mobile, one control clears them all.
- It appears and disappears with the applied chip row.

## Open Questions

- **Placement.** Pinned at the end of the chip row, outside the scrolling area so
  it is always reachable, or as the last item inside the scroll?
- **Component.** Reuse `WorkspaceClearFiltersButton` with a named variant for the
  tray's lighter background, or build a mobile-specific button?
- **Clearing logic.** Reuse `clearAppliedFilters` from the desktop hook, or add a
  clear action to `useMobileAppliedFilterChips`?

## Implementation Notes

- **Do after [093]:** [093] animates the chip row, and this control lives in that
  row.

## Out Of Scope

- Clear All inside the category drawer. The drawer's draft already has its own
  unselect action.
