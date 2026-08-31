# [055] - [EPIC-005] - Add Logout Action

## Goal

Allow account-backed users to log out and return to anonymous usage.

## User Story

As an account-backed user, I want to log out so I can end my account session on the device.

## Requirements

- Add a logout action for account-backed users.
- Call the backend logout endpoint through the generated auth API.
- After logout, bootstrap a fresh anonymous session so the app remains usable.
- Refresh user state after logout.
- Do not show logout to anonymous users.
- Do not delete user data in this ticket.
- Do not create an account wall after logout.

## Implementation Notes

- This ticket should build on the account-aware user state from `[051]`.
- The generated auth API includes logout support.
- Logout placement should be decided based on the account settings/header state available at implementation time.

## Acceptance Criteria

- Account-backed users have a clear logout action.
- Logout ends the account-backed session.
- The app returns to anonymous session behavior after logout.
- Anonymous users can continue using the core name workflow.
- Anonymous users do not see irrelevant logout controls.
