# [084] - Cap The Number Of Names A User Can Hold

## Status

Backlog

## Summary

Put a ceiling on how many names one account can accumulate. There is no limit
today, at any layer.

## Context

Nothing bounds the list. `add_custom_given_name` and `given_name_action` both
upsert into `user_given_names_states` without counting what is already there,
and `get_approved_given_names` returns whatever it finds. A script pointed at
`POST /api/v1/givenName/custom` can add rows until the table fills.

The cost is not only storage. Several things scale with list length and get
worse quietly:

- `WorkspaceApprovedNamesList` sorts and renders every approved name, with a
  `motion` layout animation per chip. It is a three-column grid whose row count
  is `ceil(count / 3)`, so the page just keeps growing.
- Compare Names pairs from the approved list, and [078] respaces every rating on
  each drag. Both are fine at 50 names and neither has been looked at above that.
- `given_name_ratings` holds a row per name per user once compared.

Anonymous accounts make this cheap to exercise. `GET /api/v1/auth/anonymous`
creates a user and logs it in with no credential of any kind, so an abuser is
not rate-limited by needing accounts — see [085].

## Open Questions

- What the cap actually is. It wants to be well above any real use — a person
  naming one baby is choosing among tens, not thousands — while still being low
  enough to bound the work. Somewhere in the low hundreds is the obvious range
  but the number is a product call.
- Whether the cap counts approved names only, or every state including rejected
  and snoozed. Rejections are the larger number by far, since they accumulate
  with every swipe in the generator, and they are the rows that grow without the
  user perceiving a list getting longer.
- What happens at the ceiling. Refusing the add with a message is the honest
  option; silently dropping it is not. There is no affordance for this today.
- Whether the limit is enforced per user or per account age, and whether
  anonymous accounts get a lower one than authenticated ones.

## Implementation Notes

- `src/routes/v1/givenName/postCustomGivenName.ts` and
  `src/routes/v1/givenName/postGivenNameAction.ts` are the two write paths.
- A count check belongs alongside the existing validation in the route, or in
  the SQL function where it can be transactional with the insert. The route is
  simpler; the SQL is correct under concurrent requests.
- The frontend has no error affordance for a rejected add beyond
  `getCustomNameErrorMessage`, which maps any 400 to "That name can't be used."
  A cap message would want distinguishing from a profanity rejection.

## Acceptance Criteria

- A user cannot exceed the cap.
- Hitting the cap is explained rather than silently ignored.
- The limit is enforced on the backend, not only in the UI.

## Out Of Scope

- Request rate limiting, which is [085].
- Pruning or archiving names already held.
