# [128] Unit tests for the user and filter reducers

## Status

Backlog

## Priority

P2

## Summary

Add unit tests for the two small reducers.

## Context

- Units: `src/state/user/user.reducer.ts`, `src/state/filter/filter.reducer.ts`.
- Follow the `ui-testing` skill: `Foo.test.ts` beside `Foo.ts`, one test file per
  unit.

## Acceptance Criteria

- `userReducer`:
  - `ADD_USER` sets the user and clears `sessionLoadFailed`, so a successful retry
    does not leave the app redirecting to the error page
  - `USER_PROVIDER_LOADED` sets `userProviderLoaded`
  - `USER_LOAD_FAILED` sets `sessionLoadFailed`
  - `PROMPT_ACCOUNT_CREATION` and `DISMISS_ACCOUNT_PROMPT` set and clear
    `promptAccountCreation`
  - an unknown action returns the same state object
  - no action mutates the state it was given
- `filterReducer`:
  - `ADD_NAME_FILTERS` replaces `nameFilters` with the payload
  - an unknown action returns the same state object
