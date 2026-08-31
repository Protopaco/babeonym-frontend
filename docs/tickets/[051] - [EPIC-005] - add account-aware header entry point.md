# [051] - [EPIC-005] - Add Account-Aware Header Entry Point

## Goal

Make the header auth entry reflect whether the current session is anonymous or account-backed.

## User Story

As an anonymous user, I want a clear `Sign In / Sign Up` entry point so I understand I can preserve my progress.

As an account-backed user, I want the header to show `Account` so I can access account-related settings.

## Requirements

- Add explicit user loading state to the frontend user provider so auth-dependent UI does not guess before boot completes.
- Treat a user with no `authProvider` as anonymous.
- Show `Sign In / Sign Up` for anonymous users after user state has loaded.
- Show `Account` for users with an auth provider.
- Preserve anonymous usage; do not introduce an account wall.
- Do not add the auth modal in this ticket.
- Do not add logout behavior in this ticket.
- Keep the existing account/settings route behavior unless a later ticket changes it.

## Implementation Notes

- The current `UserProvider` already creates an anonymous session when `/user/me` returns unauthenticated.
- The first account-state boundary can be derived from `user.authProvider`.
- Header entry visual styling should stay owned by the header account component.

## Acceptance Criteria

- Header no longer always renders static `Account` copy.
- Anonymous users see `Sign In / Sign Up`.
- Account-backed users see `Account`.
- Header auth text does not flicker through an incorrect state while the user provider is booting.
- Core name generation and compare workflows remain available to anonymous users.
