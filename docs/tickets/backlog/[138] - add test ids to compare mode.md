# [138] Add test ids to compare mode

## Status

Backlog

## Priority

P3

## Summary

Add `data-testid` attributes to compare mode, so flows can pick between two names
and see the too-few-names empty state.

## Context

- Location is `compare`. Format and rules are in the `ui-testing` skill
  (`test-ids.md`); the location list is `docs/testing/locationReference.md`.
- Only elements a flow clicks, types into or asserts on get an id. Nothing else
  about behavior or styling changes.
- Depends on the shared component `BaseNameChip` accepting an id from the parent.
  That prerequisite has no ticket yet.
- Components: `CompareNamesMode`, `CompareNameChip`.

## Elements (proposed ids)

- Each name in the pair: `compare-chip-name-<name>`
- The empty state shown when there are too few names: `compare-text-empty`

## Open

- **Chosen state.** A chip carries a chosen or default state. Decide whether tests
  read that from the id, from an attribute, or from the rendered result.

## Acceptance Criteria

- Every listed element carries its id, in the `location-form-descriptor` format.
- No other markup, styling or behavior changes.
