# [129] Unit tests for request helpers

## Status

Backlog

## Priority

P2

## Summary

Add unit tests for the helpers that retry, order and describe failures of API
requests.

## Context

- Units, all in `src/utils`: `getErrorMessage`, `retryRequest`, `enqueueRequest`.
- Follow the `ui-testing` skill: `Foo.test.ts` beside `Foo.ts`, one test file per
  unit.
- `retryRequest` waits 400 ms and then 1200 ms between attempts. Tests use
  Vitest fake timers so they do not actually wait.
- `enqueueRequest` keeps one module-level chain, so tests must not share ordering
  state between cases.
- Errors are `FetchError` and `ResponseError` from `@/api/generated`.

## Acceptance Criteria

- `getErrorMessage`:
  - `FetchError` gives the connection copy
  - a 429 `ResponseError` gives the too-many-requests copy
  - a 5xx `ResponseError` gives the server-side copy
  - any other `ResponseError` (such as a 400) gives the generic copy
  - a non-error value gives the generic copy
- `retryRequest`:
  - returns the result of a task that succeeds first time, with one call
  - retries a `FetchError` and a 5xx `ResponseError`, and returns the result of a
    later success
  - does not retry a 4xx `ResponseError` or an unrelated error, and throws it at
    once
  - after the delayed retries are used up, makes one final attempt and throws its
    error
- `enqueueRequest`:
  - runs queued tasks one at a time, in the order queued, even when an earlier
    task takes longer
  - a failed task rejects for its own caller and does not stop later tasks
  - returns each task's own result to its caller
