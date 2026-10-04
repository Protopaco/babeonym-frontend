# [139] Add test ids to the error page

## Status

Backlog

## Priority

P3

## Summary

Add `data-testid` attributes to the error page, so tests can tell its four paths
apart.

## Context

- Location is `error`. Format and rules are in the `ui-testing` skill
  (`test-ids.md`); the location list is `docs/testing/locationReference.md`.
- Only elements a flow clicks, types into or asserts on get an id. Nothing else
  about behavior or styling changes.
- Depends on the shared component `PrimaryTextButton` accepting an id from the
  parent. That prerequisite has no ticket yet.
- Component: `src/pages/ErrorPage/ErrorPage.tsx`. It has two buttons that both read
  "Try again" (one restarts sign-in, one reloads), so text alone cannot tell them
  apart.

## Elements (proposed ids)

- The title: `error-text-title`
- The message: `error-text-message`
- Try again, restarting sign-in: `error-button-retry-sign-in`
- Try again, reloading the page: `error-button-retry-reload`
- Return home: `error-button-return-home`

## Acceptance Criteria

- Every listed element carries its id, in the `location-form-descriptor` format.
- The two "Try again" buttons have different ids.
- No other markup, styling or behavior changes.
