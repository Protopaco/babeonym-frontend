# Design Unified Name Workspace Layout

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

## Notes

- This ticket is design/planning only unless explicitly expanded later.
- Use component ownership and theme-token rules when translating this design into implementation tickets.
- From a user-understanding perspective, the filter drawer should read as part of Name Generator mode even if its shell is implemented at the workspace level.
