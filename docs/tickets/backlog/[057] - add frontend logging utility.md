# [057] - Add Frontend Logging Utility

## Goal

Create a lightweight frontend logging utility so application code does not call `console.*` directly.

## User Story

As a developer, I want frontend logging to go through a shared utility so errors and diagnostics can be handled consistently as the app grows.

## Requirements

- Add a small frontend logger module.
- Support common levels such as debug, info, warn, and error.
- Keep the first implementation lightweight and console-backed.
- Allow future routing to telemetry or remote diagnostics without changing every call site.
- Replace direct `console.*` usage in app code where practical.
- Do not introduce remote telemetry in the first pass unless separately approved.
- Do not block account creation work on this ticket.

## Implementation Notes

- Startup provider error handling currently uses direct `console.error` as a temporary fallback.
- This is a backlog-level infrastructure ticket, not part of the account creation critical path.
- Logger API shape should stay simple until there are enough use cases to justify more structure.

## Acceptance Criteria

- Frontend code has a shared logger utility.
- New frontend logging call sites can use the shared utility instead of `console.*`.
- Existing direct console usage is reduced where it is low-risk to update.
- The implementation does not change user-facing app behavior.
