# [067] - [EPIC-004] - Clear Name State When The Session Resets

## Goal

Leave no trace of the previous account in the app after a logout or an account
deletion.

## User Story

As someone who has just logged out, I want the app to look like a fresh start,
so I am not looking at names belonging to the account I left.

## Background

Logging out and deleting an account both end in `resetToAnonymousSession`, which
creates a new anonymous session, refetches the user, and navigates to `/`. It
dispatches only `ADD_USER`, so the given-name provider is untouched and keeps the
previous account's approved names, candidates, and filters.

The provider does not recover on its own either. Its boot effect is guarded by a
`booted` ref that is already `true`, so a changed user does not trigger a
refetch. The stale list stays until the page is reloaded by hand.

The result is a new anonymous session displaying another account's saved names,
which reads as a data leak even though the data is only in memory.

## Requirements

- Clear the given-name state when a session resets: approved names, candidates,
  and selected filters.
- Clear the account-prompt flag, so a prompt open at logout does not carry into
  the new session.
- Let the given-name provider load fresh data for the new anonymous user without
  a manual page reload.
- Apply to both entry points, since logout and account deletion share the same
  reset path.

## Implementation Notes

- `useResetToAnonymousSession` in `src/hooks/useResetToAnonymousSession.ts` is the
  single place both flows go through. `useLogout` and `useDeleteAccount` call it
  after their own API call.
- The `booted` ref in `givenName.provider.tsx` is what blocks the refetch. Any fix
  has to address that as well as the state, or the state will clear and then stay
  empty.
- Filters are URL-backed as well as held in provider state. Clearing one without
  the other will leave the two disagreeing.
- The account-prompt flag lives in the user reducer as `promptAccountCreation`,
  added in ticket `[065]`.

## Acceptance Criteria

- After logging out, the approved-name list is empty rather than showing the
  previous account's names.
- After deleting an account, the same holds.
- The new anonymous session loads its own generated-name candidates without a
  manual reload.
- Applied filters do not survive the reset in either the UI or the URL.
- An account prompt open at the time of logout is not visible afterwards.

## Out Of Scope

- Server-side session handling, which already works.
- Sweeping orphaned anonymous users.
- Any change to what logout or account deletion do on the backend.
