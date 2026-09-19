# [118] Outline the tutorial toggle when it is on

## Status

Backlog

## Summary

When the tutorial toggle is on, it fills solid, and the action ledge under a
filled circle looks odd. Give the on state a white outline so the ledge reads
against it.

## Context

- The off state is a ring and already reads fine with the ledge.
- The ledge depth comes from `--button-ledge` in `PrimaryButton.css`.

## Open

- Background token (`--color-background`) or a new contrast token for the
  outline, since "white" won't hold in the dark theme.
- Whether the outline belongs to PrimaryButton's fill emphasis generally, or
  only to this toggle.

## Acceptance Criteria

- The toggle's on state has a visible outline, and the ledge no longer looks
  wrong under it.
