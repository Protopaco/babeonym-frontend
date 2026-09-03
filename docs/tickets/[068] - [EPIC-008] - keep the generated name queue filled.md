# [068] - [EPIC-008] - Keep The Generated Name Queue Filled

## Goal

Make the supply of generated names feel endless, with no waiting and no empty
state reachable by working through the queue.

## User Story

As someone evaluating names quickly, I want the next name to always be there, so
the rhythm of approving and rejecting is never interrupted.

## Background

Candidates are fetched once at boot and again only when filters change.
`GET_NEW_CANDIDATES` replaces the whole array, and each action removes one entry.
Nothing tops the list up as it drains, so working through a batch empties it and
`NameEvaluator` renders nothing.

Acting quickly is not the cause; it only reaches the end of the batch sooner.

The reducer already contains a commented-out `ADD_CANDIDATES` case that merges
new candidates into the existing list and de-duplicates by
`givenCustomNameBridgeId`. That is the shape a refill needs.

## Requirements

- Refetch candidates in the background when the queue falls below a threshold,
  rather than only at boot and on filter change.
- Append refilled candidates to the existing queue instead of replacing it.
- De-duplicate on merge, since a refetch can return names already held locally.
- Never disturb the candidate at the front of the queue. It is the card being
  looked at, and replacing it mid-decision would change what the user is acting
  on.
- Show no loading state for a refill. The point is that the user never sees one.
- Do not start a refill while one is already in flight.
- Keep replacing the queue outright when filters change, which is a deliberate
  reset rather than a top-up.

## Implementation Notes

- `ADD_CANDIDATES` is commented out at `src/state/givenName/givenName.reducer.ts`
  and already merges and de-duplicates. Reviving it is likely most of the state
  change.
- `getNewCandidates` in `givenName.provider.tsx` currently dispatches
  `GET_NEW_CANDIDATES`. A refill path needs to dispatch the append action instead,
  while the filter-change path keeps the replacing one.
- The candidates endpoint takes a `limit`, so batch size and threshold can be
  tuned independently.
- The threshold should be a named value rather than a literal buried in a
  condition. Around `10` to `15` is the starting point.
- A refill that fails should leave the existing queue alone and stay silent. The
  user has names to work with, so there is nothing to report.

## Acceptance Criteria

- Working through names continuously never empties the queue.
- No loading indicator appears during a refill.
- The name on screen does not change when a refill lands.
- No duplicate names appear in the queue after a refill.
- Changing filters still replaces the queue immediately.
- A failed refill does not clear the queue or surface an error.

## Out Of Scope

- Changing how candidates are selected or ranked on the backend.
- The empty state itself, which should become unreachable through normal use but
  is still needed when a filter combination genuinely matches nothing.
