# [065] - [EPIC-007] - Add Anonymous Account Call To Action

## Goal

Offer an anonymous user the chance to keep their work at the points where they
have enough of it to care, without interrupting the name flow.

## User Story

As an anonymous user who has built up a list of names, I want to be told I can
save it so I do not lose the work, and I want to be able to ignore that offer
completely.

## Requirements

- Show a small, low-weight call to action reading roughly "Want to save your
  progress?" with a create-account action.
- Open it when a mutation response carries the account prompt signal from ticket
  `[064]`. The frontend does not own the cadence rule and does not see the
  underlying count.
- Keep it open once shown, until it is dismissed. The signal is a trigger, not a
  render condition.
- Do not show it to users who are not anonymous.
- Never block, gate, or interrupt any part of the app. Nothing behind it becomes
  unavailable and no flow waits on it.
- Open the existing auth modal rather than introducing a second sign-in path.
- Do not persist anything about the prompt. Missing a prompt is preferable to
  repeating one, and the backend rule is what limits how often it fires.

## Implementation Notes

- `AccountLink.tsx` is the existing pattern: it detects anonymity with
  `!user || user.authProvider === 'anonymous'` and pairs `AuthModal` with
  `startGoogleSignIn`.
- The backend fires on exact milestone matches, so the signal is true for one
  response only. The component holds its own open state from that point.
- Placement is not settled. The prompt should be visible in both the workspace
  and compare modes, which suggests a single component near the approved names
  rather than one copy per mode. Confirm placement before building.
- Signing in from an anonymous session preserves the user's work only when the
  provider account is new. `getGoogleCallback.ts` links the provider onto the
  existing user in that case. When an account already exists for that address,
  the user is signed into it and the anonymous session's work is orphaned by
  design; ticket `[066]` covers telling them.

## Acceptance Criteria

- An anonymous user sees the prompt when the backend signals one is due.
- A signed-in user never sees it.
- The prompt stays visible after further actions and closes only on dismissal.
- The prompt opens the existing auth modal.
- Nothing in the app becomes unavailable while the prompt is shown.
- The component follows the frontend architecture rules, with its own CSS file
  and theme tokens only.

## Out Of Scope

- The prompt signal and its cadence, which is ticket `[064]`.
- The settings page entry point for anonymous users, which is a requirement of
  ticket `[054]`.
- Merging anonymous work into an existing account.
- Reminder or re-prompt behavior.
