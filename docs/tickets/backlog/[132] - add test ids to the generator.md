# [132] Add test ids to the generator

## Status

Backlog

## Priority

P1

## Summary

Add `data-testid` attributes to the name generator, so the first Playwright flow
(see a candidate, approve, snooze or reject it) can find what it needs.

## Context

- Location is `generator`. Format and rules are in the `ui-testing` skill
  (`test-ids.md`); the location list is `docs/testing/locationReference.md`.
- Only elements a flow clicks, types into or asserts on get an id. Nothing else
  about behavior or styling changes.
- Shared components (`PrimaryIconButton`, `BareIconButton`, `NameEtymologyModal`)
  take their id from the parent, so this ticket depends on the shared components
  accepting one. That prerequisite has no ticket yet.
- Components: `NameEvaluator`, `EvaluatedNameDisplay`, `NameEvaluationActions`,
  `NameLimitMessage`, `CandidateErrorMessage`, `ExhaustedNameMessage`,
  `GeneratedNameSkeleton`.

## Elements (proposed ids)

- The three action buttons: `generator-button-approve`, `generator-button-snooze`,
  `generator-button-reject`
- The candidate name: `generator-text-candidate-name`
- The info button beside the name: `generator-button-info`
- The etymology modal: `generator-dialog-etymology`
- The user's surname beside the name: `generator-text-surname`
- The five states the display slot can be in, one id each:
  - loading: `generator-skeleton-candidate`
  - limit reached: `generator-text-limit-message`
  - fetch failed: `generator-text-error-message`
  - pool exhausted: `generator-text-exhausted-message`

## Acceptance Criteria

- Every listed element carries its id, in the `location-form-descriptor` format.
- Each of the five slot states is distinguishable by its id.
- No other markup, styling or behavior changes.
