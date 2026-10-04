# [137] Add test ids to the mobile filters

## Status

Backlog

## Priority

P2

## Summary

Add `data-testid` attributes to the mobile filter bar and drawer, so flows can
open a category, pick options, and apply them at mobile width.

## Context

- Location is `filters`. Format and rules are in the `ui-testing` skill
  (`test-ids.md`); the location list is `docs/testing/locationReference.md`.
- Only elements a flow clicks, types into or asserts on get an id. Nothing else
  about behavior or styling changes.
- Depends on the shared components (`SecondaryButton`, `PrimaryTextButton`,
  `BareIconButton`) accepting an id from the parent. That prerequisite has no
  ticket yet.
- Components: `MobileNameFilters`, `MobileFilterDrawer`, `MobileFilterList`,
  `FilterListItem`, `FilterSearchField`.
- This is separate code from the desktop surface in [136], doing the same job, so
  its ids carry a `-mobile` suffix on the descriptor to keep them distinct.

## Elements (proposed ids)

- One button per category on the bar, `filters-button-category-mobile-<category>`
- The drawer: `filters-drawer-category-mobile`, its close button
  `filters-button-close-mobile`
- Drawer actions: `filters-button-clear-all-mobile`, `filters-button-set-mobile`
- Searching: `filters-input-search-mobile`
- One item per option, `filters-chip-option-mobile-<label>`

## Acceptance Criteria

- Every listed element carries its id, in the `location-form-descriptor` format.
- No mobile id matches a desktop id from [136].
- No other markup, styling or behavior changes.
