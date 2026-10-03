# [127] Unit tests for name list helpers

## Status

Backlog

## Priority

P2

## Summary

Add unit tests for the helpers that group etymology meanings and keep unchanged
names from re-rendering.

## Context

- Units, both in `src/utils`: `groupMeaningsByLanguage`, `reuseUnchangedGivenNames`.
- Follow the `ui-testing` skill: `Foo.test.ts` beside `Foo.ts`, one test file per
  unit.
- `approvedGivenNameLimit` is a constant with no logic, so it has no test.
- `reuseUnchangedGivenNames` is called by the reducer's `ADD_APPROVED`, so it is
  also covered indirectly by [126].

## Acceptance Criteria

- `groupMeaningsByLanguage`:
  - groups meanings under the language each belongs to
  - meanings with no language form their own group, first, with `language: null`
  - language groups follow the order each language first appears
  - no meanings gives an empty list
  - when every meaning has a language, no null group is returned
- `reuseUnchangedGivenNames`:
  - a name identical in name, rating, gender and etymology keeps the previous
    object (same reference)
  - a name that differs in any of those four fields gets the new object
  - a name with no previous match gets the new object
  - the result follows the order of the next list
  - names removed from the next list are not in the result
