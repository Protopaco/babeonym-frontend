# [097] - Cache the first name queue

## Status

Shelved

## Why This Is Shelved

The cache was worth building when the unfiltered call cost 413–456ms. Migration
052 capped `get_name_candidates` at the tier-3 rank boundary and brought the same
call to 103ms on prod, so the cache would now save roughly a tenth of a second,
once, on a user's first request. Every request after that carries
`excludeBridgeIds` and was never going to be served from the cache anyway.

Against that it costs an `EXISTS` roundtrip on every unfiltered call, a migration
and a `db/` wrapper for a function whose only caller is this check, and a
standing rule that any rebuild of `given_name_popularity_overall` needs an API
restart or the service keeps handing out names that are no longer in the table.
That last one matters because [110] expects to be re-run several times while its
weight is tuned.

Nothing here is wrong, and the design still holds if the endpoint becomes a
bottleneck again. It is not one now.

## Summary

A brand-new user's first candidates request has no filters, no exclusions and no
name history. The answer is effectively the same for every such user, but it
still runs the unfiltered query each time. Build that answer on the server once
and serve new users a random 50 from it.

## Context

- When the app boots with no URL filters, it calls `/givenName/candidates` with
  no filters, no limit (so the default 50 applies) and no `excludeBridgeIds`.
- `get_name_candidates` depends on the user only through
  `user_given_names_states`. A user with no rows there gets the same pool as
  anyone else.
- Measured against prod: the unfiltered call runs in 413–456ms. Per-row etymology
  was ruled out as the cause at ~0.1ms a name, so the cost is proportional to the
  whole ~105,000 name set rather than to the 50 rows returned.
- Name filters are deliberately not cached. After the 051 bridge indexes
  `get_name_filters` runs in ~12ms, down from 135ms, and the browser already
  holds a copy for a day under the existing `Cache-Control` header.

## Requirements

### The new-user check

- A new SQL function answers whether a user has any rows in
  `user_given_names_states`, as an `EXISTS` rather than a count. It stops at the
  first row instead of counting every row a user has, and it is the exact
  question being asked.
- It checks state rows only, not `given_name_ratings`. The candidates query
  excludes names on state rows alone, and a user cannot have rated anything
  without approving names first.
- `getUserActionCount` is left alone. `shouldPromptAccountCreation` still uses
  it, and it answers a different question.
- Migration 052, with a `db/` wrapper alongside the other query files.
- The migration must be applied to prod before the backend deploys, or every
  unfiltered request 500s on a function that is not there yet.

### The cache

- One helper, `cacheUntilRestart` in `src/utils/cacheUntilRestart.ts`, taking a
  builder and returning a getter. Each endpoint creates its own getter at module
  load.
- Plain in-process memory. No new dependency, no Redis.
- Nothing expires. A value is built on the first request and kept for the life of
  the process. A restart is what refreshes it, which is what a deploy already
  does.
- The helper holds the in-flight promise rather than the resolved value, so two
  simultaneous first requests share one query.
- A failed build is dropped so the next request retries. Failures are never
  cached: otherwise a transient database error takes the endpoint down until
  someone redeploys.

### Candidates

- The handler serves from the cache only when all of these hold:
  - no filter params
  - no `excludeBridgeIds`
  - limit absent or 50
  - the user has no state rows
- The cheap parameter checks run first, so only an otherwise-qualifying request
  pays for the state-row check. A refill always carries `excludeBridgeIds`, so it
  never reaches the database for this.
- Every other request goes to the query unchanged.
- The cached value is 100 candidates, built by `get_name_candidates` with a user
  id that has no state rows and limit 100.
- Each response is a random 50 of the cached 100. The handler copies the array
  before sampling — the cached value is never mutated, since it is handed to
  every later response.
- The sample is a plain random 50. It does not try to preserve the query's
  70/20/10 mix, and roughly-right is accepted. The endpoint and the cache stay
  dumb: any tuning of the mix belongs in `get_name_candidates`.

### Staleness

- A data migration does not restart the service, so the cached copy stops
  matching the database until it does. Restarting the service is the last step of
  applying a data migration, and belongs in the migration notes.

## Out Of Scope

- Changes to `get_name_candidates`.
- Caching `get_name_filters`.
- Caching filtered or refill requests.
- Onboarding.
- Any frontend or OpenAPI change. The response shape does not change.

## Acceptance Criteria

- Once the cache is warm, a new user's first request does not run
  `get_name_candidates`.
- Two new users get different 50s drawn from the same 100.
- A user with any action, filter or exclusion gets the query result as today.
- A failed build does not persist: the next request tries again.

## Files

- `src/routes/v1/givenName/getNameCandidates.ts`
- `src/utils/cacheUntilRestart.ts` (new)
- `src/utils/sampleRandomEntries.ts` (new)
- `src/db/` wrapper for the new check (new)
- `052_*.sql` in babeonym-setup (new)
