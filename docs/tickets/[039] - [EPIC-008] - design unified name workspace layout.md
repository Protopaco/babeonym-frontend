# Design Unified Name Workspace Layout

## Requirements Reference

- `docs/application-requirements.md`

## Goal

Define the single-page name workspace layout before implementing the structural refactor.

## Context

The current app spreads name workflows across generator, saved names, compare names, and future custom-name flows. The desired direction is one main workspace that keeps the user in the core loop.

## Scope

- Define the main workspace structure.
- Define the workspace mode treatment:
  - `Add Name`
  - `Compare Names`
- Make `Add Name` the default mode.
- Keep the approved-name ranked list visible below the active mode.
- Remove redundant subsection header behavior now that the experience is essentially one page.
- Decide how the former section-header underline style becomes a contextual utility divider.
- Define inactive mode styling using existing theme semantics.
- Confirm how custom-name entry attaches to the ranked list area.
- Define how the contextual divider behaves by mode:
  - In Name Generator mode, it expands into a filter summary/drawer entry.
  - In Compare Names mode, it collapses to a thin color divider.
  - In account or other non-generator contexts, it remains a thin divider if used.
- Define the collapsed Name Generator filter summary:
  - `Filters` label.
  - Chevron affordance.
  - Applied filters grouped by category.
  - Removable applied filter chips/items.
- Define the expanded Name Generator filter drawer relationship to the page.

## Acceptance Criteria

- The unified workspace layout is documented.
- The active and inactive mode selector behavior is documented.
- The default mode is `Add Name`.
- The persistent ranked list placement is documented.
- The former subsection header has a clear new purpose as contextual divider/filter drawer surface.
- Applied filters are visible in Name Generator mode without opening the full drawer.
- The design does not require users to navigate between name workflow pages.

## Settled Design Direction

Use a three-band vertical workspace.

### Top Interaction Band

The top band is the active interaction area.

Default mode: `Add Name`

- Show the generated-name candidate.
- Show surname if available.
- Show `Approve`, `Snooze`, and `Reject` actions.
- Treat this as the primary thing the user can do first.

Sibling mode: `Compare Names`

- Show two large selectable name buttons.
- Keep the `OR` treatment between the two names.
- Selecting either name should immediately advance to a new pair.
- Use the same top interaction area as `Add Name`, with the task swapped.

Do not show a large redundant page title like `Name Generator` or `Compare Names` in this band. The mode should be understandable from the active interaction and workspace state.

### Contextual Divider / Filter Surface Band

The middle band replaces the old subsection header.

In `Add Name` mode:

- The divider expands enough to show `Filters`.
- Show a chevron or equivalent expand affordance.
- Show applied filters grouped by category when filters exist.
- Allow applied filters to be removed from the summary.
- Expanding the surface reveals full filter controls.
- `Set Filters` collapses the surface back to the filter summary.

In `Compare Names` mode:

- Collapse the surface to a thin color divider.
- Do not show filter text or controls because filters do not affect compare mode.

The divider should still create a visual break in the page, but it should not behave like a redundant section title.

### Your Names Band

The bottom band is the persistent approved-name list.

- Label this section `Your Names`.
- Show approved names in ranked order.
- Use approved-name chips for visual consistency.
- Subtle rank numbers are acceptable.
- Do not show a prominent `Rankings` label.
- Add the custom-name `+` affordance in this section.
- Empty state should direct users toward `Add Name` mode, not another page.

Desktop list direction:

- Use a multi-column ranked list so more names are visible at once.
- Keep ordering readable down columns, such as `1, 2, 3` in the first column and `4, 5, 6` in the second.

Mobile list direction:

- Stack the approved-name list vertically.
- Keep filter summary compact enough that it does not bury the generated-name candidate.

Primary design principle:

- The active action changes.
- The approved-name list remains.

## Notes

- This ticket is design/planning only unless explicitly expanded later.
- Use component ownership and theme-token rules when translating this design into implementation tickets.
- From a user-understanding perspective, the filter drawer should read as part of Name Generator mode even if its shell is implemented at the workspace level.
