# [136] Add test ids to the desktop filters

## Status

Backlog

## Priority

P2

## Summary

Add `data-testid` attributes to the desktop filter surface, so flows can open
filters, pick options, apply them, and clear them.

## Context

- Location is `filters`. Format and rules are in the `ui-testing` skill
  (`test-ids.md`); the location list is `docs/testing/locationReference.md`.
- Only elements a flow clicks, types into or asserts on get an id. Nothing else
  about behavior or styling changes.
- Depends on the shared components (`PrimaryTextButton`, `BareIconButton`)
  accepting an id from the parent. That prerequisite has no ticket yet.
- Components: everything under
  `src/components/NameWorkspace/WorkspaceFilterSurface`: `WorkspaceFilterToggle`,
  `WorkspaceFilterActions`, `WorkspaceClearFiltersButton`,
  `WorkspaceAppliedFilterChip`, `FilterPicker`, and the four filter columns
  (gender, decade, language, culture).
- The mobile drawer is a separate ticket.

## Elements (proposed ids)

- Opening and closing: the Filters toggle `filters-button-toggle`, the close button
  `filters-button-close`
- Applying: `filters-button-set`, and the clear-all control inside the surface
  `filters-button-clear-all`
- The clear button outside the surface, with its confirmation
  (`WorkspaceClearFiltersButton`): `filters-button-clear`, and the confirmation
  dialog and its buttons, once read
- Applied filters: one chip per applied filter, `filters-chip-applied-<label>`
- The four columns: `filters-list-gender`, `filters-list-decade`,
  `filters-list-language`, `filters-list-culture`
- Picking options: the search input `filters-input-search`, and one chip per option,
  `filters-chip-option-<label>`

## Open

- **Option labels shared across columns.** If two columns can contain an option with
  the same label, include the column in the id.

## Acceptance Criteria

- Every listed element carries its id, in the `location-form-descriptor` format.
- The trailing identifier for a label follows the segment rule in the `ui-testing`
  skill (`test-ids.md`).
- The clear-all confirmation and its buttons are identified and given ids.
- No other markup, styling or behavior changes.
