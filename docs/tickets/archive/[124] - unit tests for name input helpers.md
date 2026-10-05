# [124] Unit tests for name input helpers

## Status

Backlog

## Priority

P1

## Summary

Add unit tests for the helpers that clean up and validate a name typed by hand,
and the two that turn a failed request into copy.

## Context

- Units, all in `src/utils`: `normalizeNameInput`, `stripDisallowedNameCharacters`,
  `capitalizeNameSegments`, `getCustomNameErrorMessage`, `getSurNameErrorMessage`.
- Follow the `ui-testing` skill: `Foo.test.ts` beside `Foo.ts`, one test file per
  unit.
- `normalizeNameInput` composes `stripDisallowedNameCharacters` and truncates to
  `NAME_MAX_LENGTH`. Tests use the constant, not a hard-coded number.
- The two error message helpers use `ResponseError` from `@/api/generated`.
  `getSurNameErrorMessage` falls through to `getErrorMessage`.

## Acceptance Criteria

- `stripDisallowedNameCharacters`:
  - keeps letters, apostrophes, hyphens and spaces
  - removes digits and other symbols
  - keeps accented and non-Latin letters
  - converts curly apostrophes to straight ones
  - collapses runs of whitespace to one space
  - does not trim a trailing space
- `normalizeNameInput`:
  - strips and then truncates to `NAME_MAX_LENGTH`
  - a removed character does not use up one of the allowed characters
  - a name over the limit is cut to exactly the limit
- `capitalizeNameSegments`:
  - capitalizes after the start, a space and a hyphen
  - does not capitalize after an apostrophe (`da'ar` becomes `Da'ar`)
  - never lowercases (`McKenna` is unchanged)
  - capitalizes accented and non-Latin letters
  - empty string returns an empty string
- `getCustomNameErrorMessage`: a 400 `ResponseError` gives the "can't be used"
  copy; any other error gives the generic retry copy.
- `getSurNameErrorMessage`: a 400 `ResponseError` gives the surname copy; any
  other error returns what `getErrorMessage` returns.
