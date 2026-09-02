# [053] - [EPIC-004] - Wire Header Auth Entry To Create Account Modal

## Goal

Connect the anonymous header auth entry point to the reusable create-account modal.

## User Story

As an anonymous user, I want the header `Sign In / Sign Up` action to open account creation options so I can preserve my current progress.

## Requirements

- Clicking `Sign In / Sign Up` from the header opens the create-account modal.
- Clicking `Account` as an account-backed user continues to navigate to account settings.
- The modal should use the reusable component from ticket `[052]`.
- The Google provider action should start the backend Google OAuth flow.
- Preserve the current anonymous session before OAuth begins.
- Do not add milestone prompt logic in this ticket.
- Do not add logout behavior in this ticket.

## Implementation Notes

- This ticket depends on `[051]` for account-aware header state.
- This ticket depends on `[052]` for the reusable auth modal.
- The header should own auth entry behavior, while the modal should own modal presentation.
- Avoid introducing account-wall routing.

## Acceptance Criteria

- Anonymous header auth action opens the create-account modal.
- Google auth action starts the Google OAuth backend flow.
- Dismissing the modal returns the user to the same app workflow.
- Account-backed users can still reach account settings from the header.
- Anonymous users are not blocked from name generation, custom names, saved names, or compare mode.
