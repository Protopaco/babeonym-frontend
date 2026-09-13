# [097] - Hardcode the first name queue

## Status

Backlog

## Summary

There is no onboarding and the first candidates call is always unfiltered, so its
answer never meaningfully changes and the ~300ms unfiltered query is wasted work.
Ship 100 names in the frontend instead. At load, a random 50 of them seed the queue
with no network request; the server is first called by the refill.

## Depends On

[096] — the hardcoded entries need the full candidate shape, etymology included.

## Requirements

- A data file of 100 candidates in the full candidate shape, drawn from prod using
  the unfiltered, offset-0, 70/20/10 tier mix.
- Bridge ids are taken from prod or verified against it.
- At load, seed the queue with a random 50 from the file.
- The first refill must not return names already queued. Confirm the seeded ids flow
  through `excludeBridgeIds`.
- Document how to regenerate the file, and regenerate it whenever name data or ids
  change.

## Files

- `givenName.provider.tsx`
- New data file for the 100 candidates
- Optional generation script or query

## Out Of Scope

- Changes to `get_name_candidates` or `CANDIDATE_REFILL_THRESHOLD`.
- Onboarding.
- Response caching.

## Acceptance Criteria

- A fresh load makes no candidates request.
- Two loads produce different queues drawn from the same 100.
- Every bridge id matches prod.
- The first refill returns no name that is already queued.
