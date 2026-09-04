# [079] - Review Mobile Styling Across The Site

## Status

Backlog

## Summary

Audit every surface below 600px, record what is broken or unconsidered, and fix
what is small enough to fix in place.

## Context

Mobile styling has been added surface by surface as each feature landed, never
reviewed as a whole. 29 stylesheets carry a `@media (--mobile)` block, but
nothing has checked that they still agree with each other after the workspace
rebuild (EPIC-008), the 120px generated name, and the icon button family.

Several changes since those blocks were written are known to affect mobile and
were not re-checked at the time:

- The generator's action buttons became large circular icon buttons.
- The generated name grew to 64px on mobile.
- The mode header became two tab pills.
- The workspace gained a shared max-width column.
- Name chips gained slide-out action drawers, which are hover-driven.

The last one is the clearest suspected defect: a drawer that opens on `:hover`
has no equivalent on a touchscreen, so delete and save actions may be
unreachable or may stick open after a tap.

## Requirements

- Every route and mode is reviewed at mobile width: the workspace in both modes,
  the mobile filter surface, Your Names, Settings, the error page, the header
  and its nav overlay, and every modal.
- Findings are recorded, each with the surface, what is wrong, and severity.
- Anything unreachable or unusable on touch is treated as a defect, not a
  polish item.
- Fixes that are contained to one component's own stylesheet land in this
  ticket.
- Anything needing a layout or interaction rethink is split into its own ticket
  rather than absorbed here.

## Open Questions

- **Where the line sits between a fix and a follow-up.** This is an audit, so it
  produces a list. Agreeing up front what gets fixed in place and what gets
  split out avoids the ticket quietly turning into a redesign.
- Which devices or widths count as the target. 375 and 390 are the common
  iPhone widths; whether anything narrower needs to work has not been decided.
- Whether hover-driven affordances get a touch equivalent here or in their own
  ticket.

## Implementation Notes

- The named breakpoints from [072] are `@media (--mobile)` and friends; do not
  reintroduce pixel literals while working.
- `ListNameChip` opens its drawer on `:hover` and `:focus-within`.
- `PrimaryButton` already guards its hover fill behind `@media (hover: hover)`;
  that pattern is the precedent for anything similar found here.
- `MobileNameFilters` replaces `WorkspaceFilterLayout` below 600, so the filter
  surfaces are genuinely different components and both need checking.

## Acceptance Criteria

- Every surface listed above has been reviewed at mobile width.
- The findings list exists and is recorded on the ticket.
- No control is unreachable on touch.
- Contained fixes are applied; everything else has a ticket.
- Desktop and tablet render unchanged.

## Out Of Scope

- Tablet, which is [080].
- Redesigning any surface.
- Changing what any screen does.
