# [126] Unit tests for the given name reducer

## Status

Backlog

## Priority

P1

## Summary

Add unit tests for `givenNameReducer`, the state logic behind the candidate queue
and the approved list.

## Context

- Unit: `src/state/givenName/givenName.reducer.ts`, with
  `givenName.initialState.ts` as its starting point.
- Follow the `ui-testing` skill: `givenName.reducer.test.ts` beside the reducer.
- Tests for `givenName.provider.tsx` itself wait for [117], the provider split.
  This ticket covers the reducer only. It also gives [117] a partial safety net.
- Many actions carry deliberate behavior in their comments: merge order, the
  exhausted flag, and what a reset returns to.

## Acceptance Criteria

- `GET_NEW_CANDIDATES`:
  - replaces the candidates
  - sets `candidatesExhausted` when the payload is empty and clears it otherwise
  - clears `candidateErrorMessage`
- `ADD_CANDIDATES`:
  - appends new candidates after existing ones, keeping existing order
  - a candidate already held (same bridge id) is not duplicated
  - `candidatesExhausted` is true when the merge adds nothing, even if the payload
    was not empty
  - clears `candidateErrorMessage`
- `REMOVE_CANDIDATE`: removes by bridge id; an unknown id changes nothing; an empty
  list stays empty.
- `RESTORE_CANDIDATE`: puts the candidate at the front.
- `ADD_APPROVED`: a name that comes back identical keeps the object already held
  (same reference), and a changed name gets the new object.
- `REORDER_APPROVED`: the approved list becomes the payload, in its order.
- `REMOVE_APPROVED`: removes by bridge id; an unknown id changes nothing.
- `RESTORE_APPROVED`: inserts at the given index, including index 0 and the end.
- `GIVEN_NAME_PROVIDER_LOADED`: sets `givenNameProviderLoaded`.
- `CANDIDATE_FETCH_FAILED`: stores the message.
- `SET_SELECTED_FILTERS`: replaces all four id lists at once.
- `RESET_GIVEN_NAME_STATE`: returns the initial state, including
  `givenNameProviderLoaded` back to false.
- An unknown action returns the same state object.
- No action mutates the state it was given.
