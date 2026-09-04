# [066] - [EPIC-004] - Explain Sign In To An Existing Account

## Goal

Tell a user when signing in put them into an account they already had, so an
empty list is explained rather than alarming.

## User Story

As someone who signed in after being told I could save my progress, I want to
understand why my names are not there, so I do not think the app lost them.

## Background

`getGoogleCallback.ts` has three paths. A new provider account with an existing
session links onto the current user, so anonymous work carries over. An account
that already exists for that address signs the user into that account instead,
and the anonymous session's names, custom names, and ratings are left behind.

Merging the two is deliberately not being done. The database side is solvable,
but the interface is not: asking someone mid-authentication whether to merge
their activity, and defining what that activity is, is a question most people
cannot answer. Orphaning is the accepted outcome.

That makes the account prompt in ticket `[065]` misleading in this one path. It
offers to save progress, and this is the case where progress is not saved.

## Requirements

- Detect the case where sign-in resolved to a pre-existing account rather than
  linking to the current session.
- Tell the user plainly that they already had an account and were signed into it.
- Do not offer a merge, and do not present a choice.
- Do not block the user from continuing.
- Do not imply data was lost through an error.

## Implementation Notes

- The distinguishing branch is `!user.isNewUser` in
  `babeonym-backend/src/routes/v1/auth/getGoogleCallback.ts`. The other two
  branches preserve the session's work and need no message.
- All three branches currently redirect to the same frontend path, so the
  frontend has nothing to key the message off. The signal has to come from the
  redirect, in the way the error path already uses query parameters.
- Anonymous work is orphaned rather than deleted. Wording should not promise it
  is retrievable, but should not describe it as destroyed either.

## Acceptance Criteria

- Signing into a pre-existing account shows the message.
- Signing in for the first time, or linking a new provider to an anonymous
  session, shows nothing.
- The message does not block the app.
- No merge is offered or performed.

## Out Of Scope

- Merging anonymous activity into an existing account.
- Deleting or sweeping orphaned anonymous users.
- Microsoft OAuth, which has the same shape and can follow.
