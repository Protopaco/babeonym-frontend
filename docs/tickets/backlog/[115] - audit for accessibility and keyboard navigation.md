# [115] Audit for accessibility and keyboard navigation

## Status

Backlog

## Summary

No accessibility pass has been done. This is an audit ticket: find and record
what is broken, don't fix it here. Fixes become their own tickets.

## Context

Known concerns, as starting points rather than a finished list:

- **Keyboard reachability.** The workspace is built from MUI `ButtonBase` and
  custom chips. Whether every action is reachable by Tab, and in a sensible
  order, is unverified.
- **Focus visibility.** `PrimaryButton.css` defines `:focus-visible` for each
  tone, but the chips, the filter drawer and the mode header have not been
  checked.
- **`disableRipple` and custom interactions.** Several controls answer a pointer
  with movement rather than colour. Movement is invisible to a screen reader and
  suppressed under `prefers-reduced-motion`, so each needs a non-visual
  equivalent.
- **The drag-to-rerank list** ([078]). Drag has no keyboard equivalent by
  default.
- **Colour contrast against the themes.** Four themes, and only the light one has
  had any deliberate attention.
- **Announcements.** Clearing filters, voting in compare, and the custom name
  draft all change content without moving focus.

## Out Of Scope

- Any fix. This ticket produces a list.
- Automated a11y tooling in CI — that belongs with EPIC-011.

## Acceptance Criteria

- Every interactive surface is walked by keyboard alone, and the result recorded.
- Findings are written down with enough detail to become tickets.
- Each finding is marked blocking or cosmetic.
