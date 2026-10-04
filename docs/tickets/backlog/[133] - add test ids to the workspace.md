# [133] Add test ids to the workspace

## Status

Backlog

## Priority

P1

## Summary

Add `data-testid` attributes to the approved names list, custom names, and the
account prompt, so the core flow (approve, reorder, remove, add a custom name) can
be tested.

## Context

- Location is `workspace`. Format and rules are in the `ui-testing` skill
  (`test-ids.md`); the location list is `docs/testing/locationReference.md`.
- Only elements a flow clicks, types into or asserts on get an id. Nothing else
  about behavior or styling changes.
- Depends on the shared components (`ListNameChip`, `NameChipAction`,
  `PrimaryIconButton`, `BareIconButton`, `PrimaryTextButton`, `InformationalModal`)
  accepting an id from the parent. That prerequisite has no ticket yet.
- Components: `WorkspaceApprovedNames` and its children, `CustomNameChip`,
  `AccountPromptBanner`, `ExistingAccountNotice`. The filter surface is out of
  scope; it belongs to the filters tickets.

## Elements (proposed ids)

- The approved list: `workspace-list-approved-names`
- One chip per approved name, with a trailing identifier:
  `workspace-chip-name-<name>`
- Per chip: remove `workspace-button-remove-<name>`, info
  `workspace-button-info-<name>`
- Add custom name: `workspace-button-add-custom-name`
- The custom name draft: the input `workspace-input-custom-name`, save
  `workspace-button-save-custom-name`, cancel `workspace-button-cancel-custom-name`
- Account prompt banner: `workspace-banner-account-prompt`, its Sign Up button
  `workspace-button-sign-up`, its dismiss button `workspace-button-dismiss-prompt`
- Existing account notice: `workspace-dialog-existing-account`

## Open

- **How reordering is done and how modes are switched.** Neither showed up in the
  buttons surveyed, so the elements they need are not listed yet. Find them while
  implementing and list them here.

## Acceptance Criteria

- Every listed element carries its id, in the `location-form-descriptor` format.
- The trailing identifier for a name follows the segment rule in the `ui-testing`
  skill (`test-ids.md`). A name that reduces to nothing uses its bridge id.
- Chips for different names have different ids, and the same name always produces
  the same id.
- The reorder and mode switch elements are identified and given ids.
- No other markup, styling or behavior changes.
