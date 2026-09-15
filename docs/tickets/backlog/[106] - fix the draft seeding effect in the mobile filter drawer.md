# [106] - Fix The Draft Seeding Effect In The Mobile Filter Drawer

## Status

Backlog

## Summary

ESLint flags the effect that seeds the mobile filter drawer's draft from the
applied filters: a missing `searchParams` dependency warning, and a
`set-state-in-effect` error on the same line.

## Context

- **Where:** `MobileFilterDrawer.tsx`, the `useEffect` keyed on `[category]`
  that calls `setDraftOptionIds(parseFilterIds(searchParams, category.paramKey))`.
- **Why `searchParams` was left out:** the draft should seed once when a
  category opens. With `searchParams` in the dependencies, any URL change while
  the drawer is open would reset the draft and wipe the user's picks.
- **Why it is an error:** setting state directly in an effect causes an extra
  render. The same file already uses the render-time pattern for
  `displayedCategory`, adjusting state during render when `category` changes.

## Open Questions

- Seed the draft during render when `category` changes, like
  `displayedCategory`, which would remove the effect and both findings?
- Or keep the effect and suppress the lint rules with a comment explaining the
  once-per-open intent?

## Out Of Scope

- Other ESLint findings in the repo.
