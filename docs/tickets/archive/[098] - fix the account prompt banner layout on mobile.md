# [098] - Fix The Account Prompt Banner Layout On Mobile

## Status

Backlog

## Summary

On mobile, the "Want to save your progress?" banner is formatted strangely. Lay
it out so it reads as one tidy prompt with its dismiss where a dismiss is
expected.

## Context

`AccountPromptBanner` is a row on desktop — copy on the left, "Create an
account" and the dismiss X on the right. Below 600px it becomes a column:

- The copy sits on top, left-aligned.
- The actions row underneath is stretched to the full width with
  `justify-content: space-between`, so "Create an account" sits at the left and
  the X is pushed to the far right, under the copy rather than in the banner's
  corner.
- The root is an MUI `Container maxWidth="lg"`, whose own gutters are replaced
  by `padding: 16px 32px` in the mobile block.

## Requirements

- The banner reads as one prompt on mobile, not two loose rows.
- The dismiss X sits where a close control is expected.

## Open Questions

- **What exactly looks wrong.** The notes above are what the CSS does, not a
  confirmed description of the problem. Attach a screenshot before building.

## Implementation Notes

- Component: `src/components/NameWorkspace/AccountPromptBanner/AccountPromptBanner.tsx`
  and its sibling CSS. Layout changes stay inside the mobile block.
- The banner renders only for anonymous users who have not dismissed it
  (`promptAccountCreation` in the user state), so testing needs a fresh anonymous
  session.

## Acceptance Criteria

- On a phone, the banner's copy, button and dismiss sit together as one
  intentional layout.
- Desktop and tablet are unchanged.

## Out Of Scope

- The banner's copy.
- When the banner appears or how dismissal persists.
