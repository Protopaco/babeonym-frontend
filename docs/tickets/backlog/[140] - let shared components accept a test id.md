# [140] Let shared components accept a test id

## Status

Backlog

## Priority

P1

## Summary

Add an optional `testId` prop to the shared building blocks, so a parent can give
the element it renders a `data-testid`. Without it, none of the test id tickets
([132] to [139]) can be done.

## Context

- Nothing in the app uses `data-testid` today, and none of these components accepts
  an id from its parent.
- The `ui-testing` skill (`test-ids.md`) says a shared component takes the location
  of the screen it is rendered on, so the parent has to be able to pass the id in.
- The frontend `CLAUDE.md` says a shared component's variation is a named prop on
  its API. This follows that rule.
- Components: `PrimaryTextButton`, `PrimaryIconButton`, `BareIconButton`,
  `SecondaryButton`, `NameChipAction`, `BaseNameChip`, `BaseModal`,
  `BaseTextModal`.
- The modals have buttons of their own, so `BaseModal` and `BaseTextModal` also
  need `confirmTestId` and `cancelTestId`.
- Other components that tickets [132] to [139] need an id on, such as
  `ListNameChip`, `NameEtymologyModal`, `InformationalModal`, `PageBackLink` and
  `FilterListItem`, wrap these. Each takes the same prop and passes it down.

## Requirements

- Each listed component takes an optional `testId` prop and renders it as
  `data-testid` on the element a test would click or read.
- With no `testId`, nothing is rendered, so existing screens are unchanged.
- `BaseModal` and `BaseTextModal` also take `confirmTestId` and `cancelTestId` for
  their buttons, and `testId` for the dialog itself.
- The wrappers named in Context pass the prop through to the component they wrap.

## Open

- **Which element carries the id** in components that render nested elements, such
  as a MUI button inside a tooltip. It should be the element a test clicks, so
  Playwright's click lands on it.

## Acceptance Criteria

- Every listed component and wrapper accepts `testId`.
- The id lands on the interactive element, not on a wrapper around it.
- A component rendered without `testId` produces the same markup as before.
- Modal buttons can be given ids through `confirmTestId` and `cancelTestId`.
- No behavior or styling changes.
