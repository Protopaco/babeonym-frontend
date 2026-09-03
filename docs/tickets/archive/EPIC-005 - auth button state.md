# EPIC-005 - Auth Button State

## Goal

Make the header account/auth control reflect user state instead of always acting like a static account link.

## Notes

- Logged-out users should see a sign-in/sign-up entry point.
- Logged-in users should see account access and eventually sign-out behavior.
- The current `/settings` link can remain a placeholder until auth flow decisions are made.
- Desktop and mobile navigation both need state-aware behavior.

## Candidate Child Tickets

- Add logged-out header label/state.
- Add logged-in account state.
- Add sign-out option.
- Update mobile nav auth entry.
- Connect to user/auth provider state.
