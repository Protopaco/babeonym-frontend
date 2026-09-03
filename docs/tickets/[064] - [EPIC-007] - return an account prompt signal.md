# [064] - [EPIC-007] - Return An Account Prompt Signal

## Goal

Let the backend decide when an anonymous user is due an account-creation prompt,
and tell the frontend as a single boolean.

## User Story

As the app, I want to know that a user has invested enough work to be worth
offering account preservation, without the frontend owning that rule.

## Background

Current state is the wrong signal for engagement. The approved name count goes
down when names are rejected, so a user can approve twelve names, reject three,
approve one more, and cross the same point twice.

Two existing tables already record actions monotonically:

- `user_given_names_states` holds one row per user and name. `given_name_action`
  only ever flips `state` on that row and nothing deletes it, so the row count is
  "names ever acted on" and never decreases.
- `given_name_ratings.vote_total` is incremented for both names in a comparison
  and never decremented, so `SUM(vote_total) / 2` is the lifetime number of
  comparisons.

Their sum is an engagement count needing no counter column and no schema change.

The count itself is not sent. The prompt rule lives in the backend so cadence can
be tuned without a frontend release, and so that adding "show once ever" later is
a backend-only change.

## Requirements

- Add a database function returning a single action count for a user, being the
  row count in `user_given_names_states` plus half the summed `vote_total` from
  `given_name_ratings`.
- Decide in the backend whether the user is due a prompt, by exact match of that
  count against a configured list of milestones, defaulting to `25`, `50`, `75`.
- Make the milestone list configurable rather than hardcoded.
- Return the decision as a boolean on the three given-name mutation responses.
- Return `false` for users who are not anonymous, and skip the aggregates for
  them entirely. Only anonymous users are ever prompted, and skipping the work
  avoids it for the accounts whose row counts grow largest.
- Do not return the count itself.
- Do not add the signal to the user response. See the note below.
- Do not add a counter column or an events table.
- Do not change the retry or idempotency behavior of the existing functions.

## Implementation Notes

- New script in `babeonym-setup/src/database/postGres`, next free number is
  `030`, following existing naming: `030_get_user_action_count.v1.sql` with a
  `get_user_action_count(p_user_id INT)` function. Run by hand, as always.
- Exact match rather than a threshold is what removes the need to remember which
  milestones have already fired. Every action moves the count by exactly 1 or 0,
  so it steps through every integer and no milestone can be jumped. Adding a
  custom name touches three tables but only one counted row.
- Exact match is also why this does not belong on the user response. A returning
  user sitting at 37 matches no milestone, so a boot-time value would only ever
  fire when they happened to be sitting exactly on one, which is a repeat of a
  prompt they already saw rather than a new one.
- Shape the response so ownership is explicit rather than flattening a user
  concern into the name domain:

  ```
  { approvedGivenNames: [...], user: { promptAccountCreation: true } }
  ```

- Name the field as a fact about the user, not an instruction to the UI. The
  server states that a prompt is due; the frontend decides what that looks like.
- The shared schema is `ApprovedGivenNamesResponse` in
  `babeonym-backend/src/utils/swagger/schema/givenName.ts`, referenced by
  `postGivenNameAction.ts`, `postCompareGivenNames.ts`, and
  `postCustomGivenName.ts`. It needs renaming once it describes a composed
  response rather than a list.
- Both aggregates are index range scans over one user's rows, served by the
  `UNIQUE (user_id, given_custom_name_bridge_id)` constraint on each table. They
  are cheaper than the `getApprovedGivenNames` query already running in the same
  request.
- Restart the backend before regenerating the frontend client. A running server
  serves the OpenAPI spec captured at boot.

## Acceptance Criteria

- All three given-name mutation responses carry the signal under a `user` key.
- The signal is true only when an anonymous user's action count exactly matches a
  configured milestone.
- Non-anonymous users always receive `false` and the aggregates do not run.
- The count does not decrease when a name is rejected after being approved.
- Replaying a retried action does not inflate the count.
- Milestones can be changed without editing application code.
- The frontend client is regenerated and the project typechecks with `tsc -b`.

## Out Of Scope

- The call to action itself, which is ticket `[065]`.
- Weighting actions by type.
- Persisting whether a prompt has been shown.
- The user response.
