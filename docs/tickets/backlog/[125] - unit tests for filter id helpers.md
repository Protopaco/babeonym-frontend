# [125] Unit tests for filter id helpers

## Status

Backlog

## Priority

P1

## Summary

Add unit tests for the three helpers that move selected filter ids between the
app and the URL.

## Context

- Units, all in `src/utils`: `parseFilterIds`, `serializeFilterIds`,
  `writeFilterIds`.
- Follow the `ui-testing` skill: `Foo.test.ts` beside `Foo.ts`, one test file per
  unit.
- `parseFilterIds` and `writeFilterIds` take a `URLSearchParams`. `serializeFilterIds`
  returns `undefined` for an empty selection because the candidates endpoint reads
  an absent parameter as "no filter on this category".

## Acceptance Criteria

- `parseFilterIds`:
  - reads a comma-separated list into numbers
  - a missing parameter gives an empty list
  - removes duplicates, keeping first-seen order
  - drops non-numeric, zero, negative and non-integer values
- `serializeFilterIds`:
  - joins ids with commas
  - an empty list returns `undefined`, not an empty string
- `writeFilterIds`:
  - sets the parameter to the comma-joined ids
  - an empty selection removes the parameter instead of setting it empty
  - leaves other parameters untouched
- A round trip (`writeFilterIds` then `parseFilterIds`) returns the original ids.
