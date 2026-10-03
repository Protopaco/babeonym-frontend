# [130] Unit tests for the local storage client

## Status

Backlog

## Priority

P3

## Summary

Add unit tests for `localStorageClient`, which wraps `localStorage` and must keep
working when storage is unavailable.

## Context

- Unit: `src/utils/localStorageClient.ts`.
- Follow the `ui-testing` skill: `localStorageClient.test.ts` beside the file.
- Keys come from `LOCAL_STORAGE_KEYS`. Tests pick a real key from that constant
  rather than inventing one.
- Every method swallows storage errors on purpose, so the UI still works
  in memory.

## Acceptance Criteria

- `getString` returns the stored value, and the fallback when the key is absent
  (`null` when no fallback is given).
- `setString` then `getString` round-trips a value.
- `getBoolean` reads `'true'` and `'false'` as booleans, and returns the fallback
  for any other stored value or an absent key.
- `setBoolean` stores the value so `getBoolean` reads it back.
- `remove` deletes the key.
- When `localStorage` throws on read, `getString` returns the fallback, and
  `getBoolean` returns its fallback.
- When `localStorage` throws on write or remove, the call does not throw.
- When `localStorage` is not accessible at all, reads return the fallback and
  writes do not throw.
