# [141] Scaffold the e2e repo

## Status

Backlog

## Priority

P1

## Summary

Create the separate repository for Babeonym's Playwright tests, with the project
set up, one environment setting for the target, and one script each for local and
production runs.

## Context

- Decided in EPIC-011: end-to-end tests live in their own repo, not in
  `babeonym-frontend`. Conventions are in the `ui-testing` skill (`e2e.md`).
- TypeScript, to match the frontend.
- This repo carries its own integration test documentation. The frontend
  `CLAUDE.md` is not involved.
- Specs find elements by `data-testid` (`test-ids.md`). The location list stays in
  the frontend repo at `docs/testing/locationReference.md`; the e2e repo links to
  it rather than keeping a copy.

## Requirements

- A Playwright and TypeScript project with a config that reads its target URL from
  an environment variable, with no default that points at production.
- A script for local runs and a second script for production runs. They run the
  same specs against different URLs.
- A short README covering how to run each script, what the target variable is, and
  where the conventions live.
- A folder layout with one spec per workflow, so later tickets add files and do not
  restructure.

## Open

- **What the local target is.** The local dev server (`localhost:2223`) or a local
  production build.

## Acceptance Criteria

- The project installs and the config loads.
- One placeholder spec runs successfully against the local app through the local
  script.
- Running with no target set fails with a clear message instead of guessing.
- The README explains both scripts.
