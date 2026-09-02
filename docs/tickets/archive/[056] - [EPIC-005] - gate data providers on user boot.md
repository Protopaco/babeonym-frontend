# [056] - [EPIC-005] - Gate Data Providers On User Boot

## Goal

Prevent authenticated frontend data requests from racing anonymous session creation during app startup.

## User Story

As a new anonymous user, I want the app to finish creating my session before loading name and filter data so the app does not get stuck on skeleton states.

## Requirements

- Gate authenticated data-provider boot logic on the user provider's loaded/auth-ready state.
- `FilterProvider` should wait until user boot completes before loading reference data.
- `GivenNameProvider` should wait until user boot completes before loading candidates and approved names.
- Provider boot failures should be handled intentionally instead of surfacing as unhandled promise rejections.
- Do not introduce an account wall.
- Do not change route behavior.
- Do not change account modal, OAuth, settings, or logout behavior in this ticket.

## Implementation Notes

- The backend returns anonymous users with `authProvider: "anonymous"`.
- Anonymous sessions are cookie/session-backed and may need to be created before other authenticated endpoints are requested.
- This ticket depends on the user provider exposing an explicit loaded/auth-ready state.
- Initial browser symptoms may include early `401` responses from reference or given-name endpoints before a refresh succeeds.

## Acceptance Criteria

- New sessions do not request reference or given-name data before user boot completes.
- Fresh anonymous users can load the app without relying on refreshes to recover from startup races.
- Filter and given-name providers still load normally after the anonymous user session is ready.
- Startup provider errors no longer appear as unhandled promise rejections.
- Core anonymous usage remains available.
