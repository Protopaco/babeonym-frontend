# [054] - [EPIC-006] - Build Account Settings Page Foundation

## Goal

Replace the placeholder account settings page with a real account settings foundation.

## User Story

As an account-backed user, I want a settings page where I can see account details and future account-backed preferences.

## Requirements

- Build the account settings page layout foundation.
- Show account identity details available from the current user state.
- Include placeholder-safe rows for future account-backed settings such as theme and surname only if supported by existing state/API data.
- Use existing theme values and tokens.
- Preserve anonymous usage; do not account-wall the app.
- For anonymous users, show an optional account preservation entry point rather than blocking access.
- Do not add logout behavior in this ticket unless explicitly approved separately.
- Do not implement unsupported settings persistence in this ticket.

## Implementation Notes

- Current user model includes `email`, `username`, `authProvider`, `theme`, and `surName`.
- Theme and surname are likely account-backed features, but exact persistence behavior should stay within existing API support.
- Page styling belongs in the page/component CSS files.

## Acceptance Criteria

- `/settings` renders a real settings page instead of placeholder text.
- Account-backed users can see available account identity information.
- Anonymous users are not blocked from returning to the core workflow.
- The page uses theme tokens and existing frontend architecture rules.
- No unsupported account settings save behavior is introduced.
