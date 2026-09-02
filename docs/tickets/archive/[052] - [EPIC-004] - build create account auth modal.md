# [052] - [EPIC-004] - Build Create Account Auth Modal

## Goal

Create a reusable auth modal that invites anonymous users to preserve their progress with an account.

## User Story

As an anonymous user with saved name progress, I want an optional account prompt so I can save what I have built without feeling blocked from continuing.

## Requirements

- Build a reusable create-account/auth modal shell.
- Include Google as the only auth provider action for now.
- Omit Microsoft auth UI in this ticket.
- Modal copy should frame account creation as preserving or saving progress.
- Modal copy must not imply an account is required to continue using the app.
- Modal must be dismissible.
- Modal must be responsive.
- Do not wire milestone prompts in this ticket.
- Do not add logout behavior in this ticket.
- Do not build the account settings page in this ticket.

## Implementation Notes

- Google OAuth is backend-supported through the generated auth API surface.
- Anonymous session conversion is expected to be handled by the existing cookie/session-backed backend flow.
- Keep provider actions visually component-owned.
- Every new `.tsx` component needs a sibling `.css` file.

## Acceptance Criteria

- A reusable modal component exists for future account CTA flows.
- The modal shows a Google account action only.
- The modal can be closed without changing the user's workflow.
- The modal uses theme tokens and component-owned styling.
- Anonymous users can continue using the core app after dismissing the modal.
