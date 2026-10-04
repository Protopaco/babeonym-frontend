# [134] Add test ids to settings

## Status

Backlog

## Priority

P2

## Summary

Add `data-testid` attributes to the settings page, so the nightly can run the
delete-account step.

## Context

- Location is `settings`. Format and rules are in the `ui-testing` skill
  (`test-ids.md`); the location list is `docs/testing/locationReference.md`.
- Only elements a flow clicks, types into or asserts on get an id. Nothing else
  about behavior or styling changes.
- Depends on the shared components (`PrimaryTextButton`, `BareIconButton`,
  `BaseTextModal`, `BaseModal`, `PageBackLink`) accepting an id from the parent.
  That prerequisite has no ticket yet.
- Components: `pages/Settings`, `SettingsRow`, `SurNameSuggestion`, `ThemePicker`,
  `DeleteAccountButton` and its dialog, `AboutButton` and its modal.

## Elements (proposed ids)

- Back link: `settings-link-back`
- Surname row: the input `settings-input-surname`, its save button
  `settings-button-save-surname`, and its second icon button (check what it does
  while implementing)
- Surname suggestion: the accept link `settings-button-accept-surname-suggestion`
- Theme picker: one chip per theme, `settings-chip-theme-<theme>`
- Delete account: the button `settings-button-delete-account`, the dialog
  `settings-dialog-delete-account`, its confirm `settings-button-confirm-delete-account`
  and cancel `settings-button-cancel-delete-account`
- About: the button `settings-button-about`, the modal `settings-dialog-about`, and
  the copy email button `settings-button-copy-email`

## Acceptance Criteria

- Every listed element carries its id, in the `location-form-descriptor` format.
- The delete account flow can be driven end to end by id alone.
- No other markup, styling or behavior changes.
