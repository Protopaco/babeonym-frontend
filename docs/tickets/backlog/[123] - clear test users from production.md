# [123] Clear test users from production

## Status

Backlog

## Summary

Prod has about 5,000 users from testing and the migration from dev. Clear them
before usage totals start, so the numbers only count real use.

## Context

- **What goes.** `delete_user` already removes everything tied to a user: name
  states, ratings, custom names and their bridge rows, settings, and the user
  row. A bulk version does the same for every user at once.
- **Sessions.** `user_sessions` still points at deleted users, so it gets
  emptied too. Every existing cookie then starts a fresh anonymous session.
- **Depends on the backend fix.** The stale-session fix in `app.ts` must be
  deployed first. Without it, every returning browser gets 500s.

## Requirements

- A single SQL script that runs in one transaction, so a failure changes
  nothing.
- It keeps a short list of accounts to preserve, set by email at the top of the
  script. Everyone else goes.
- It prints counts before and after, so you can see what it removed.
- Paul runs it against prod. It doesn't run automatically.

## Open

- Whether to restart the user id sequence so real users start at 1. Row counts
  don't need it.
- Where the script lives in babeonym-setup. It isn't a schema migration, so it
  shouldn't be a numbered file.

## Acceptance Criteria

- Only the preserved accounts are left in prod, and none of their data is lost.
- Canonical names, meanings and languages are untouched.
- Returning browsers get a fresh session, not an error.
