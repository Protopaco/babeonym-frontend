# [142] Add a lint script

## Status

Backlog

## Priority

P2

## Summary

Add an `npm run lint` script, so lint runs with one command, for you and for the
agent.

## Context

- ESLint and Prettier are installed and `eslint.config.js` exists, but
  `package.json` has no lint script.
- `eslint.config.js` and an older `.eslintrc` both exist. Which one applies is
  checked as part of this ticket.
- The agent runs a fixed list of commands. Lint joins that list once this ticket
  is done.

## Requirements

- A `lint` script that checks `src` and exits non-zero on errors.
- No source changes.

## Open

- **Existing violations.** Whether the existing code passes. If it does not,
  fixing the violations is a separate ticket.
- **The older config.** Whether `.eslintrc` should be removed.

## Acceptance Criteria

- `npm run lint` runs and reports.
- Nothing else in the app changes.
