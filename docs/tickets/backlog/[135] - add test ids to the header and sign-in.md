# [135] Add test ids to the header and sign-in

## Status

Backlog

## Priority

P2

## Summary

Add `data-testid` attributes to the header and the sign-in modal, so flows can
reach settings, log out, and start sign-in.

## Context

- Locations are `header` and `auth`. Format and rules are in the `ui-testing` skill
  (`test-ids.md`); the location list is `docs/testing/locationReference.md`.
- Only elements a flow clicks, types into or asserts on get an id. Nothing else
  about behavior or styling changes.
- Depends on the shared components (`BareIconButton`, `PrimaryTextButton`,
  `BaseTextModal`, `BaseModal`) accepting an id from the parent. That prerequisite
  has no ticket yet.
- The Google sign-in button keeps its provider styling; only an id is added.
- Components: `Header`, `LogoFull`, `SettingsLink`, `AccountLink`, `TopBar`
  (desktop and mobile), `MobileAccountButton`, `MobileTutorialToggle`,
  `LogoutConfirmDialog`, `AuthModal`, `GoogleSignInButton`.

## Elements (proposed ids)

- Header: the logo link `header-link-home`, settings `header-link-settings`, the
  account link `header-button-account`, the mobile tutorial toggle
  `header-button-tutorial-toggle`
- Logout dialog: `header-dialog-logout`, confirm `header-button-confirm-logout`,
  cancel `header-button-cancel-logout`
- Sign-in modal: `auth-dialog-sign-in`, the Google button
  `auth-button-google-sign-in`

## Open

- **Desktop and mobile versions of the same control** (the account button exists as
  `AccountLink` and `MobileAccountButton`). If both are in the DOM at once they
  need different ids, for example a `-mobile` suffix on the descriptor. Check while
  implementing.

## Acceptance Criteria

- Every listed element carries its id, in the `location-form-descriptor` format.
- No two elements on the same page share an id at any width.
- No other markup, styling or behavior changes.
