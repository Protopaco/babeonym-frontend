# [131] Unit tests for the delete account dialog

## Status

Backlog

## Priority

P3

## Summary

Add unit tests for `DeleteAccountDialog`, the confirmation in front of a
destructive action.

## Context

- Unit: `src/components/Settings/DeleteAccountButton/DeleteAccountDialog/DeleteAccountDialog.tsx`.
- Follow the `ui-testing` skill: `DeleteAccountDialog.test.tsx` beside the
  component.
- It is a thin wrapper over `BaseTextModal`, so these tests cover what the dialog
  asks of the modal and how the buttons are wired, not the modal's own behavior.
- Use Testing Library's `user-event` to click.

## Acceptance Criteria

- When `open` is true, the dialog shows the title "Delete your account?" and the
  body warning that names will be removed.
- When `open` is false, nothing is rendered.
- Clicking the Delete button calls `onConfirm` once, and does not call `onClose`.
- Dismissing the dialog calls `onClose` and does not call `onConfirm`.
