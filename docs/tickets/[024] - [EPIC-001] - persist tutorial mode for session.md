# Persist Tutorial Mode For Session

## Goal

Preserve tutorial mode across refreshes during the current browser session.

## Notes

- Use `sessionStorage`, not database persistence.
- The user explicitly controls tutorial mode through the floating helper icon.
- The helper icon active/off styling should make the current state clear.
- This should keep refresh behavior from feeling surprising while avoiding long-term tutorial noise.

## Likely Implementation Areas

- Tutorial state provider.
- Floating helper icon state behavior.

## Constraints

- Do not persist tutorial mode to the backend.
- Do not make tutorial mode a permanent account preference yet.
- Preserve the default first-load behavior unless product direction changes.
