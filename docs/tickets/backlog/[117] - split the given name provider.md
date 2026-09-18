# [117] Split the given name provider

## Status

Backlog

## Summary

`givenName.provider.tsx` is ~400 lines: fetching, the candidate queue, every
name action, the reorder save, and three effects all in one component. Split
the behaviour into hooks so the provider only wires state to context.

## Context

- CLAUDE.md asks for a refactor review on any function over 50 lines.
- Natural seams: candidate fetching and refill, candidate actions (approve,
  reject, snooze, custom), approved-list actions (reorder, save, remove),
  compare voting.
- ESLint already flags two useless try/catch wrappers and three
  exhaustive-deps warnings in this file.

## Open

- Where the seams actually fall — decide before cutting.
- Whether the exhaustive-deps warnings get fixed in the split or separately.

## Acceptance Criteria

- The provider only creates state and provides context.
- Behaviour is unchanged.
